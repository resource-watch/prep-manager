import React from 'react';

import { FORM_ELEMENTS, LANGUAGE_OPTIONS } from 'components/admin/metadata/form/constants';

import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Select from 'components/form/SelectInput';
import TextArea from 'components/form/TextArea';
import Title from 'components/ui/Title';

class Step1 extends React.Component {
  changeMetadata(obj) {
    const { form } = this.props;
    let newMetadata;

    if (obj.info) {
      const info = { ...form.info, ...obj.info };
      newMetadata = { ...form, ...{ info } };
    } else {
      newMetadata = { ...form, ...obj };
    }

    this.props.onChange({ form: newMetadata });
  }

  render() {
    return (
      <div>
        <fieldset className="c-field-container">
          <Title className="-default -secondary">
            General
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
            onChange={value => this.changeMetadata({ name: value })}
            validations={['required']}
            hint="Max length of 75 characters"
            properties={{
              name: 'name',
              label: 'Title',
              type: 'text',
              maxLength: '75',
              required: true,
              default: this.props.form.name
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.subtitle = c; }}
            onChange={value => this.changeMetadata({ info: { subtitle: value } })}
            hint="Source abbreviated"
            properties={{
              name: 'subtitle',
              label: 'Subtitle',
              type: 'text',
              default: this.props.form.info.subtitle
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
            onChange={(value) => {
              this.changeMetadata({ description: value });
              this.changeMetadata({ info: { description: value } });
            }}
            validations={['required']}
            hint="Recap of the source, function, and summary of the methodology"
            properties={{
              name: 'description',
              label: 'Description',
              rows: '6',
              required: true,
              default: this.props.form.info.description
            }}
          >
            {TextArea}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements['organization-long'] = c; }}
            onChange={value => this.changeMetadata({ info: { 'organization-long': value } })}
            properties={{
              name: 'organization-long',
              label: 'Organization (long name)',
              type: 'text',
              default: this.props.form.info['organization-long']
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.organization = c; }}
            onChange={value => this.changeMetadata({ info: { organization: value } })}
            properties={{
              name: 'organization',
              label: 'Organization (short name)',
              type: 'text',
              default: this.props.form.info.organization
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.language = c; }}
            onChange={value => this.changeMetadata({ language: value })}
            validations={['required']}
            options={LANGUAGE_OPTIONS}
            properties={{
              name: 'language',
              label: 'Data language',
              type: 'text',
              disabled: true,
              required: true,
              default: this.props.form.language || 'en',
              instanceId: 'selectLanguage'
            }}
          >
            {Select}
          </Field>

        </fieldset>

        <fieldset className="c-field-container">
          <Title className="-default -secondary">
            Data info
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.published_date = c; }}
            onChange={value => this.changeMetadata({ info: { published_date: value } })}
            validations={['required']}
            properties={{
              name: 'published_date',
              label: 'Published Date',
              type: 'date',
              default: this.props.form.info.published_date,
              required: true
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.prep_id = c; }}
            onChange={value => this.changeMetadata({ info: { prep_id: value } })}
            properties={{
              name: 'prep_id',
              label: 'Prep Id',
              type: 'text',
              default: this.props.form.info.prep_id
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.api_endpoint = c; }}
            onChange={value => this.changeMetadata({ info: { api_endpoint: value } })}
            validations={['url']}
            properties={{
              name: 'api_endpoint',
              label: 'API endpoint',
              type: 'text',
              default: this.props.form.info.api_endpoint
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.geographic_location = c; }}
            onChange={value => this.changeMetadata({ info: { geographic_location: value } })}
            properties={{
              name: 'geographic_location',
              label: 'Geographic Location',
              type: 'text',
              rows: '6',
              default: this.props.form.info.geographic_location
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.date_of_content = c; }}
            onChange={value => this.changeMetadata({ info: { date_of_content: value } })}
            properties={{
              name: 'date_of_content',
              label: 'Date of content',
              type: 'text',
              default: this.props.form.info.date_of_content
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.data_type = c; }}
            onChange={value => this.changeMetadata({ info: { data_type: value } })}
            properties={{
              name: 'data_type',
              label: 'Data type',
              type: 'text',
              default: this.props.form.info.data_type
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.spatial_resolution = c; }}
            onChange={value => this.changeMetadata({ info: { spatial_resolution: value } })}
            properties={{
              name: 'spatial_resolution',
              label: 'Spatial Resolution',
              type: 'text',
              default: this.props.form.info.spatial_resolution
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.citation = c; }}
            onChange={value => this.changeMetadata({ info: { citation: value } })}
            hint="Unless otherwise specified on Data Sharing Agreement, format should be: Organization name. “Official data layer name as in the ODP.” Accessed through Resource Watch [date]. www.resourcewatch.org (should always end with: Accessed through Resource Watch on [date]. www.resourcewatch.org)"
            properties={{
              name: 'citation',
              label: 'Citation',
              type: 'text',
              rows: '6',
              default: this.props.form.info.citation
            }}
          >
            {TextArea}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.license = c; }}
            onChange={value => this.changeMetadata({ info: { license: value } })}
            hint="License under which data are published"
            properties={{
              name: 'license',
              label: 'License',
              type: 'text',
              default: this.props.form.info.license
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.license_link = c; }}
            onChange={value => this.changeMetadata({ info: { license_link: value } })}
            validations={['url']}
            properties={{
              name: 'license_link',
              label: 'License link',
              type: 'text',
              default: this.props.form.info.license_link
            }}
          >
            {Input}
          </Field>
        </fieldset>

        <fieldset className="c-field-container">
          <Title className="-default -secondary">
            Links
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.dataDownload = c; }}
            onChange={value => this.changeMetadata({ info: { dataDownload: value } })}
            validations={['url']}
            properties={{
              name: 'dataDownload',
              label: 'Data Download link',
              type: 'text',
              default: this.props.form.info.dataDownload
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.data_download_original_link = c; }}
            onChange={value => this.changeMetadata({ info: { data_download_original_link: value } })}
            validations={['url']}
            properties={{
              name: 'data_download_original_link',
              label: 'Data Download from Original Source Link',
              type: 'text',
              default: this.props.form.info.data_download_original_link
            }}
          >
            {Input}
          </Field>

        </fieldset>
      </div>
    );
  }
}

Step1.propTypes = {
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
