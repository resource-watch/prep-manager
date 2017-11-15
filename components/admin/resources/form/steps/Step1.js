import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS, RESOURCES_TYPES } from 'components/admin/resources/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import FileImage from 'components/form/FileImage';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';


class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      form: props.form
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ form: nextProps.form });
  }

  render() {
    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    return (
      <fieldset className="c-field-container">
        {/* TITLE */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.title = c; }}
          onChange={value => this.props.onChange({ title: value })}
          validations={['required']}
          className="-fluid"
          properties={{
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.state.form.title
          }}
        >
          {Input}
        </Field>

        {/* PUBLISHED */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
          onChange={value => this.props.onChange({ published: value.checked })}
          properties={{
            name: 'published',
            label: 'Do you want to publish this resource?',
            value: 'published',
            title: 'Published',
            defaultChecked: this.props.form.published,
            checked: this.props.form.published
          }}
        >
          {Checkbox}
        </Field>

        {/* TYPE */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.resource_type = c; }}
          onChange={value => this.props.onChange({
            resource_type: value
          })}
          validations={['required']}
          className="-fluid"
          options={RESOURCES_TYPES}
          properties={{
            name: 'resource_type',
            label: 'Resource Type',
            default: this.state.form.resource_type,
            value: this.state.form.resource_type,
            required: true,
            instanceId: 'selectResourceType'
          }}
        >
          {Select}
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

        {/* URL */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.url = c; }}
          onChange={value => this.props.onChange({ url: value })}
          validations={['url']}
          className="-fluid"
          properties={{
            name: 'url',
            label: 'Url',
            type: 'text',
            default: this.state.form.url
          }}
        >
          {Input}
        </Field>

        {/* PHOTO */}
        <div className="c-field-row">
          <div className="row l-row">
            <div className="column small-12 medium-4">
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.photo = c; }}
                onChange={(value) => {
                  this.props.onChange({ photo: value });
                }}
                className="-fluid"
                properties={{
                  name: 'photo',
                  label: 'Photo',
                  placeholder: 'Browse file',
                  default: this.state.form.photo.thumb
                }}
              >
                {FileImage}
              </Field>
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
}

Step1.propTypes = {
  id: PropTypes.string,
  form: PropTypes.object,
  onChange: PropTypes.func
};

export default Step1;
