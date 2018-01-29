import React from 'react';
import omit from 'lodash/omit';
import { toastr } from 'react-redux-toastr';

import { Autobind } from 'es-decorators';

// Utils
import { get, post } from 'utils/request';

// Contants
import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/admin/metadata/form/constants';

// Components
import Navigation from 'components/form/Navigation';
import Step1 from 'components/admin/metadata/form/steps/Step1';


class MetadataForm extends React.Component {
  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      datasetID: props.dataset,
      datasetName: '',
      metadata: [],
      loading: !!props.dataset,
      form: Object.assign({}, STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization
      })
    });

    this.state = newState;
  }

  componentDidMount() {
    if (this.state.datasetID) {
      get({
        url: `${process.env.WRI_API_URL}/dataset/${this.state.datasetID}/?includes=metadata&application=prep&cache=${Date.now()}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }],
        onSuccess: (response) => {
          const metadata = response.data.attributes.metadata;

          this.setState({
            datasetName: response.data.attributes.name,
            provider: response.data.attributes.provider,
            form: (metadata && metadata.length) ?
              this.setFormFromParams(metadata[0].attributes) :
              this.state.form,
            metadata,
            // Stop the loading
            loading: false
          });
        },
        onError: (error) => {
          this.setState({ loading: false });
          console.error(error);
        }
      });
    }
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
   * - onBack
  */
  onSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate();

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const valid = FORM_ELEMENTS.isValid();

      if (valid) {
        // Start the submitting
        this.setState({ submitting: true });

        // Check if the metadata alerady exists
        const isPresent = Boolean(this.state.metadata.find((m) => {
          const hasLang = m.attributes.language === this.state.form.language;
          const hasApp = m.attributes.application === this.state.form.application;

          return hasLang && hasApp;
        }));

        post({
          type: (this.state.datasetID && isPresent) ? 'PATCH' : 'POST',
          url: `${process.env.WRI_API_URL}/dataset/${this.state.datasetID}/metadata`,
          body: {
            application: this.state.form.application,
            // Remove unnecesary atributtes to prevent 'Unprocessable Entity error'
            ...omit(this.state.form, ['authorization'])
          },
          headers: [{
            key: 'Content-Type',
            value: 'application/json'
          }, {
            key: 'Authorization',
            value: this.state.form.authorization
          }],
          onSuccess: () => {
            toastr.success('Success', 'Metadata has been uploaded correctly');
            this.props.onSubmit && this.props.onSubmit();
          },
          onError: (err) => {
            this.setState({ loading: false });
            try {
              if (err && !!err.length) {
                err.forEach((e) => {
                  toastr.error('Error', e.detail);
                });
              } else {
                toastr.error('Error', 'Oops! There was an error, try again');
              }
            } catch (e) {
              toastr.error('Error', 'Oops! There was an error, try again');
            }
          }
        });
      } else {
        toastr.error('Error', 'Please fill all the required fields');
      }
    }, 0);
  }

  onChange = (obj) => {
    const form = Object.assign({}, this.state.form, obj.form);
    this.setState({ form });
  }

  onBack = (step) => {
    this.setState({ step });
  }

  // HELPERS
  setFormFromParams(params) {
    const form = Object.keys(this.state.form);
    const newForm = {};

    form.forEach((f) => {
      if (params[f] || this.state.form[f]) {
        newForm[f] = params[f] || this.state.form[f];
      }
    });

    return newForm;
  }

  render() {
    console.log(this.state.metadata);

    return (
      <div className="c-metadata-form">
        <form className="c-form" onSubmit={this.onSubmit} noValidate>
          {this.state.loading && 'loading'}
          {!this.state.loading &&
            <Step1
              onChange={value => this.onChange(value)}
              form={this.state.form}
            />
          }

          {!this.state.loading &&
            <Navigation
              step={this.state.step}
              stepLength={this.state.stepLength}
              submitting={this.state.submitting}
              onBack={step => this.onBack(step)}
            />
          }
        </form>
      </div>
    );
  }
}

MetadataForm.propTypes = {
  dataset: React.PropTypes.string.isRequired,
  application: React.PropTypes.string.isRequired,
  authorization: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func
};

export default MetadataForm;
