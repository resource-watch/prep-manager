import React from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';

// Constants
import { FORM_ELEMENTS, CATEGORIES } from 'components/admin/coredatasets/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import FileImage from 'components/form/FileImage';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';
import Token from 'components/form/Token';

const subcategories = flatten(CATEGORIES.map((c) => c.subcategories));

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    const initialFormState = {
      subcategory: subcategories[0].value
    };

    this.state = {
      id: props.id,
      form: { ...initialFormState, ...props.form }
    };

    this.props.onChange(this.state.form);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      form: { ...this.state.form, ...nextProps.form }
    });
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

        {/* COUNTRY */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.country_iso = c; }}
          onChange={value => this.props.onChange({ country_iso: value })}
          validations={['required']}
          className="-fluid"
          properties={{
            name: 'country_iso',
            label: 'Country ISO',
            type: 'text',
            required: true,
            default: this.state.form.country_iso
          }}
        >
          {Input}
        </Field>

        {/* SUBCATEGORY */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.subcategory = c; }}
          onChange={value => this.props.onChange({
            subcategory: value
          })}
          validations={['required']}
          className="-fluid"
          options={subcategories}
          properties={{
            name: 'subcategory',
            label: 'Subcategory',
            default: this.state.form.subcategory,
            value: this.state.form.subcategory,
            required: true,
            instanceId: 'selectResourceType'
          }}
        >
          {Select}
        </Field>

      {/* SLUGS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.slugs = c; }}
          onChange={value => this.props.onChange({ slugs: value })}
          className="-fluid"
          validations={['required']}
          properties={{
            name: 'slugs',
            label: 'Tags',
            required: true,
            default: this.state.form.slugs,
            value: this.state.form.slugs
          }}
        >
          {Token}
        </Field>

        {/* DATASET IDS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset_ids = c; }}
          onChange={value => this.props.onChange({ dataset_ids: value })}
          className="-fluid"
          validations={['required']}
          properties={{
            name: 'dataset_ids',
            label: 'Dataset IDS',
            required: true,
            default: this.state.form.dataset_ids,
            value: this.state.form.dataset_ids
          }}
        >
          {Token}
        </Field>

        {/* PUBLISHED */}
        {/*<Field
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
        </Field>*/}
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
