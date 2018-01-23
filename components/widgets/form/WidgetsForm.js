import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// Redux
import { connect } from 'react-redux';

// Services
import WidgetsService from 'services/WidgetsService';
import DatasetsService from 'services/DatasetsService';

import { toastr } from 'react-redux-toastr';

// Constants
import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/widgets/form/constants';

// Components
import Navigation from 'components/form/Navigation';
import Step1 from 'components/widgets/form/steps/Step1';
import Spinner from 'components/ui/Spinner';

class WidgetsForm extends React.Component {
  constructor(props) {
    super(props);

    const formObj = props.dataset ?
      Object.assign({}, STATE_DEFAULT.form, { dataset: props.dataset }) :
      STATE_DEFAULT.form;

    this.state = Object.assign({}, STATE_DEFAULT, {
      id: props.id,
      loading: !!props.id,
      form: formObj,
      mode: 'editor'
    });

    // BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.service = new WidgetsService({
      authorization: props.authorization
    });

    this.datasetsService = new DatasetsService({
      authorization: props.authorization
    });
  }

  componentDidMount() {
    const { user } = this.props;
    const { id } = this.state;

    const promises = [
      this.datasetsService.fetchAllData({
        filters: {
          ...(user.role !== 'ADMIN') && { published: true }
        }
      }),
      this.datasetsService.fetchAllData({
        filters: {
          userId: user.id
        }
      })
    ];

    // Add the dashboard promise if the id exists
    if (id) {
      promises.push(this.service.fetchData({ id }));
    }

    Promise.all(promises)
      .then((response) => {
        const datasets = [...response[1], ...response[0]];
        const current = response[2];

        // Set advanced mode if paramsConfig doesn't exist or if it's empty
        const mode = (
          current &&
          (!current.widgetConfig.paramsConfig || isEmpty(current.widgetConfig.paramsConfig))
        ) ? 'advanced' : 'editor';

        this.setState({
          // CURRENT DASHBOARD
          form: (id) ? this.setFormFromParams(current) : this.state.form,
          loading: false,
          mode,
          // OPTIONS
          datasets: datasets.map(p => ({ label: p.name, value: p.id }))
        });
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
   * - handleModeChange
  */
  async onSubmit(event) {
    event.preventDefault();

    const { submitting, stepLength, step, form, mode } = this.state;

    // Validate the form
    FORM_ELEMENTS.validate(step);

    // Set a timeout due to the setState function of react
    setTimeout(async () => {
      this.setState({ submitting: true });
      // Validate all the inputs on the current step
      const widgetConfig = (this.onGetWidgetConfig) ? await this.getWidgetConfig() : {};
      const validWidgetConfig = (mode === 'editor') ? this.validateWidgetConfig(widgetConfig) : true;
      const valid = FORM_ELEMENTS.isValid(step) && validWidgetConfig;

      if (valid) {
        // if we are in the last step we will submit the form
        if (step === stepLength && !submitting) {
          const { id } = this.state;

          // The name of the widget is the title property of the
          // widgetEditor reducer
          // let formObj = Object.assign({}, form, { name: title || '' });

          const obj = {
            dataset: form.dataset,
            id: id || '',
            type: (id) ? 'PATCH' : 'POST',
            body: (mode === 'editor') ? { ...form, widgetConfig } : form
          };

          if (obj.body.sourceUrl === '') {
            delete obj.body.sourceUrl;
          }

          // Save data
          this.service.saveData(obj)
            .then((data) => {
              toastr.success('Success', `The widget "${data.id}" - "${data.name}" has been uploaded correctly`);

              if (this.props.onSubmit) this.props.onSubmit();
            })
            .catch((errors) => {
              this.setState({ submitting: false });

              try {
                errors.forEach(er =>
                  toastr.error('Error', er.detail)
                );
              } catch (e) {
                toastr.error('Error', 'Oops! There was an error, try again.');
              }
            });
        } else {
          this.setState({
            step: this.state.step + 1
          });
        }
      } else {
        this.setState({ submitting: false });
        if (!validWidgetConfig && mode === 'editor') {
          return this.errorValidationWidgetConfig(widgetConfig);
        }

        toastr.error('Error', 'Fill all the required fields or correct the invalid values');
      }
    }, 0);
  }

  onChange(obj) {
    const form = Object.assign({}, this.state.form, obj);
    this.setState({ form });
  }

  onStepChange(step) {
    this.setState({ step });
  }

  // HELPERS
  setFormFromParams(params) {
    const newForm = {};

    Object.keys(params).forEach((f) => {
      switch (f) {
        default: {
          if ((typeof params[f] !== 'undefined' || params[f] !== null) ||
              (typeof this.state.form[f] !== 'undefined' || this.state.form[f] !== null)) {
            newForm[f] = params[f] || this.state.form[f];
          }
        }
      }
    });

    return newForm;
  }

  getWidgetConfig() {
    return this.onGetWidgetConfig()
      .then(widgetConfig => widgetConfig)
      .catch(() => ({}));
  }

  validateWidgetConfig(widgetConfig = {}) {
    const { value, category, chartType, visualizationType, layer } = widgetConfig.paramsConfig || {};

    switch (visualizationType) {
      case 'chart':
        return !!chartType && !!category && !!value;
      case 'table':
        return !!chartType && !!category && !!value;
      case 'map':
        return !!layer;
      default:
        return false;
    }
  }

  errorValidationWidgetConfig(widgetConfig = {}) {
    const { visualizationType } = widgetConfig.paramsConfig || {};

    switch (visualizationType) {
      case 'chart':
        return toastr.error('Error', 'Value, Category and Chart type are mandatory fields for a widget visualization.');
      case 'table':
        return toastr.error('Error', 'Value, Category and Chart type are mandatory fields for a widget visualization.');
      case 'map':
        return toastr.error('Error', 'Layer is mandatory field for a widget visualization.');
      default:
        return false;
    }
  }

  handleModeChange(value) {
    // We have to set the defaultEditableWidget to false if the mode has been changed
    // to 'advanced'
    const newForm = (value === 'advanced') ?
      Object.assign({}, this.state.form, { defaultEditableWidget: false })
      : this.state.form;

    this.setState({
      form: newForm,
      mode: value
    });
  }

  render() {
    return (
      <form className="c-form" onSubmit={this.onSubmit} noValidate>
        <Spinner isLoading={this.state.loading} className="-light" />

        {(this.state.step === 1 && !this.state.loading) &&
          <Step1
            id={this.state.id}
            form={this.state.form}
            partners={this.state.partners}
            datasets={this.state.datasets}
            mode={this.state.mode}
            basic={this.props.basic}
            onChange={value => this.onChange(value)}
            onModeChange={this.handleModeChange}
            onGetWidgetConfig={(func) => { this.onGetWidgetConfig = func; }}
          />
        }

        {!this.state.loading &&
          <Navigation
            step={this.state.step}
            stepLength={this.state.stepLength}
            submitting={this.state.submitting}
            onStepChange={this.onStepChange}
          />
        }
      </form>
    );
  }
}

WidgetsForm.propTypes = {
  authorization: PropTypes.string,
  id: PropTypes.string,
  basic: PropTypes.bool,
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  dataset: PropTypes.string // ID of the dataset that should be pre-selected
};

export default connect(
  state => ({
    user: state.user
  })
)(WidgetsForm);
