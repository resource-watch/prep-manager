import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { toastr } from 'react-redux-toastr';

// Constants
import { FORM_ELEMENTS, CONFIG_TEMPLATE, CONFIG_TEMPLATE_OPTIONS } from 'components/widgets/form/constants';

// Redux
import { connect } from 'react-redux';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Select from 'components/form/SelectInput';
import Code from 'components/form/Code';
import Checkbox from 'components/form/Checkbox';
import SwitchOptions from 'components/ui/SwitchOptions';

import WidgetEditor, {
  Modal as WidgetModal,
  Tooltip as WidgetTooltip,
  Icons as WidgetIcons,
  setConfig
} from 'widget-editor';


class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      form: props.form
    };

    // BINDINGS
    this.triggerChangeMode = this.triggerChangeMode.bind(this);

    // WIDGET EDITOR
    // Change the configuration according to your needs
    setConfig({
      url: process.env.WRI_API_URL,
      env: 'production,preproduction',
      applications: process.env.APPLICATIONS,
      authUrl: process.env.CONTROL_TOWER_URL, // is this the correct one????
      assetsPath: '/static/images/widget-editor/',
      userToken: props.user.token,
      userEmail: props.user.email
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ form: nextProps.form });
  }

  /**
   * HELPERS
   * - triggerChangeMode
  */
  triggerChangeMode(mode) {
    if (mode === 'editor') {
      toastr.confirm('By switching you will start editing from scratch', {
        onOk: () => {
          this.props.onModeChange(mode);
        },
        onCancel: () => {
          this.props.onModeChange(this.props.mode);
        }
      });
    } else {
      toastr.confirm('By switching you can edit your current widget but you can\'t go back to the editor', {
        onOk: () => {
          this.props.onModeChange(mode);
        },
        onCancel: () => {
          this.props.onModeChange(this.props.mode);
        }
      });
    }
  }

  render() {
    const { id } = this.state;

    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    const editorFieldContainerClass = classnames({
      '-expanded': this.props.mode === 'editor'
    });

    return (
      <fieldset className="c-field-container">
        <fieldset className="c-field-container">
          {/* DATASET */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset = c; }}
            onChange={value => this.props.onChange({
              dataset: value,
              widgetConfig: {}
            })}
            validations={['required']}
            className="-fluid"
            options={this.props.datasets}
            properties={{
              name: 'dataset',
              label: 'Dataset',
              default: this.state.form.dataset,
              value: this.state.form.dataset,
              disabled: !!id,
              required: true,
              instanceId: 'selectDataset'
            }}
          >
            {Select}
          </Field>

          {/* NAME */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
            onChange={value => this.props.onChange({ name: value })}
            validations={['required']}
            className="-fluid"
            properties={{
              name: 'name',
              label: 'Name',
              type: 'text',
              required: true,
              default: this.state.form.name || '',
              value: this.state.form.name || ''
            }}
          >
            {Input}
          </Field>

          {/* DESCRIPTION */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
            onChange={value => this.props.onChange({ description: value })}
            className="-fluid"
            properties={{
              name: 'description',
              label: 'Description',
              default: this.state.form.description
            }}
          >
            {TextArea}
          </Field>

          {/* PUBLISHED */}
          {!this.props.basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
              onChange={value => this.props.onChange({ published: value.checked })}
              properties={{
                name: 'published',
                label: 'Do you want to set this widget as published?',
                value: 'published',
                title: 'Published',
                defaultChecked: this.props.form.published,
                checked: this.props.form.published
              }}
            >
              {Checkbox}
            </Field>
          }

          {/* DEFAULT */}
          {!this.props.basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.default = c; }}
              onChange={value => this.props.onChange({ default: value.checked })}
              properties={{
                name: 'default',
                label: 'Do you want to set this widget as default?',
                value: 'default',
                title: 'Default',
                defaultChecked: this.props.form.default,
                checked: this.props.form.default
              }}
            >
              {Checkbox}
            </Field>
          }

          {/* DEFAULT EDITABLE WIDGET */}
          {!this.props.basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.defaultEditableWidget = c; }}
              onChange={value => this.props.onChange({ defaultEditableWidget: value.checked })}
              properties={{
                name: 'defaultEditableWidget',
                label: 'Do you want to set this widget as the default editable widget?',
                value: 'defaultEditableWidget',
                title: 'Default editable widget',
                defaultChecked: this.props.form.defaultEditableWidget,
                checked: this.props.form.defaultEditableWidget
              }}
            >
              {Checkbox}
            </Field>
          }
        </fieldset>

        {this.state.form.dataset &&
          <fieldset className={`c-field-container ${editorFieldContainerClass}`}>
            {/* As long as we don't have preview for advanced mode we should hide this button */}
            {/* <div className="l-row row align-right">
              <div className="column shrink">
                <SwitchOptions
                  selected={this.props.mode}
                  options={[{
                    value: 'advanced',
                    label: 'Advanced'
                  }, {
                    value: 'editor',
                    label: 'Editor'
                  }]}
                  onChange={selected => this.triggerChangeMode(selected.value)}
                />
              </div>
            </div> */}

            {this.props.mode === 'editor' &&
              <div>
                <WidgetModal />
                <WidgetTooltip />
                <WidgetIcons />
                <WidgetEditor
                  datasetId={this.state.form.dataset}
                  widgetId={this.props.id}
                  saveButtonMode="never"
                  embedButtonMode="never"
                  titleMode="never"
                  provideWidgetConfig={this.props.onGetWidgetConfig}
                />
              </div>
            }

            {this.props.mode === 'advanced' &&
              <Field
                onChange={value => this.props.onChange({
                  widgetConfig: CONFIG_TEMPLATE[value] || {}
                })}
                options={CONFIG_TEMPLATE_OPTIONS}
                properties={{
                  name: 'template',
                  label: 'Template',
                  instanceId: 'selectTemplate'
                }}
              >
                {Select}
              </Field>
            }

            {this.props.mode === 'advanced' &&
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.widgetConfig = c; }}
                onChange={value => this.props.onChange({ widgetConfig: value })}
                properties={{
                  name: 'widgetConfig',
                  label: 'Widget config',
                  default: this.state.form.widgetConfig,
                  value: this.state.form.widgetConfig
                }}
              >
                {Code}
              </Field>
            }
          </fieldset>
        }
      </fieldset>
    );
  }
}

Step1.propTypes = {
  id: PropTypes.string,
  form: PropTypes.object,
  mode: PropTypes.string,
  basic: PropTypes.bool,
  datasets: PropTypes.array,
  onChange: PropTypes.func,
  onModeChange: PropTypes.func,
  onGetWidgetConfig: PropTypes.func,
  // REDUX
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Step1);
