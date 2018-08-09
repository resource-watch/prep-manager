import React from 'react';
import classnames from 'classnames';

import { FORM_ELEMENTS, LANGUAGE_OPTIONS } from 'components/admin/metadata/form/constants';

import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Select from 'components/form/SelectInput';
import TextArea from 'components/form/TextArea';
import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';

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
    const { loadingColumns, type, columns, form, adminUser } = this.props;
    const isRaster = type === 'raster';

    const aliasColumnClass = classnames('columns', {
      'small-2': isRaster,
      'small-5': !isRaster
    });

    const descriptionColumnClass = classnames('columns', {
      'small-4': isRaster,
      'small-5': !isRaster
    });

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
              default: form.name,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.source = c; }}
            onChange={value => this.changeMetadata({ source: value })}
            hint="Source abbreviated"
            properties={{
              name: 'source',
              label: 'Subtitle',
              type: 'text',
              default: form.source,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.description,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info['organization-long'],
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.organization,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.language || 'en',
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
              type: 'text',
              default: form.info.published_date,
              required: true,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.wri_rw_id = c; }}
            onChange={value => this.changeMetadata({ info: { wri_rw_id: value } })}
            properties={{
              name: 'wri_rw_id',
              label: 'Prep Id',
              type: 'text',
              default: form.info.wri_rw_id,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.endpoint = c; }}
            onChange={value => this.changeMetadata({ info: { endpoint: value } })}
            validations={['url']}
            properties={{
              name: 'endpoint',
              label: 'API endpoint',
              type: 'text',
              default: form.info.endpoint,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.geographic_coverage = c; }}
            onChange={value => this.changeMetadata({ info: { geographic_coverage: value } })}
            properties={{
              name: 'geographic_coverage',
              label: 'Geographic Coverage',
              type: 'text',
              rows: '6',
              default: form.info.geographic_coverage,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.date_of_content,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.data_type,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.spatial_resolution,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.citation = c; }}
            onChange={value => this.changeMetadata({ citation: value })}
            hint="Unless otherwise specified on Data Sharing Agreement, format should be: Organization name. “Official data layer name as in the ODP.” Accessed through Resource Watch [date]. www.resourcewatch.org (should always end with: Accessed through Resource Watch on [date]. www.resourcewatch.org)"
            properties={{
              name: 'citation',
              label: 'Citation',
              type: 'text',
              rows: '6',
              default: form.citation,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.license,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.license_link,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.dataDownload,
              disabled: !adminUser,
              readOnly: !adminUser
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
              default: form.info.data_download_original_link,
              disabled: !adminUser,
              readOnly: !adminUser
            }}
          >
            {Input}
          </Field>

        </fieldset>

        <fieldset className="c-field-container">
          <Title className="-default -secondary">
              Columns
          </Title>

          {loadingColumns &&
            <Spinner className="-inline" isLoading={loadingColumns} />
          }

          {!loadingColumns && !columns.length &&
            <p>No columns</p>
          }

          {!!columns.length &&
            <div className="c-field-row">
              {columns.map(column => {
                return (
                <div key={column.name} className="l-row row">
                  <div className="columns small-2">
                    <Field
                        properties={{
                          name: 'column_name',
                          label: 'Column name',
                          type: 'text',
                          disabled: true,
                          readOnly: true,
                          default: column.name
                        }}
                      >
                        {Input}
                      </Field>
                  </div>

                  <div className={aliasColumnClass}>
                    <Field
                      ref={(c) => {
                        if (c) FORM_ELEMENTS.elements[`columns_${column.name}_alias`] = c;
                      }}
                      onChange={(value) => {
                        this.changeMetadata({
                          columns: {
                            ...form.columns,
                            [column.name]: {
                              ...form.columns[column.name],
                              alias: value
                            }
                          }
                        });
                      }}
                      properties={{
                        name: 'alias',
                        label: 'Alias',
                        type: 'text',
                        default: (form.columns[column.name]) ? form.columns[column.name].alias : '',
                        disabled: !adminUser,
                        readOnly: !adminUser
                      }}
                    >
                      {Input}
                    </Field>
                  </div>

                  <div className={descriptionColumnClass}>
                    <Field
                      ref={(c) => {
                        if (c) FORM_ELEMENTS.elements[`columns_${column.name}_description`] = c;
                      }}
                      onChange={(value) => {
                        this.changeMetadata({
                          columns: {
                            ...form.columns,
                            [column.name]: {
                              ...form.columns[column.name],
                              description: value
                            }
                          }
                        });
                      }}

                      properties={{
                        name: 'description',
                        label: 'Description',
                        type: 'text',
                        default: (form.columns[column.name]) ? form.columns[column.name].description : '',
                        disabled: !adminUser,
                        readOnly: !adminUser
                      }}
                    >
                      {Input}
                    </Field>
                  </div>

                  {isRaster &&
                    <div className="columns small-4">
                      <Field
                        ref={(columnType) => {
                          if (columnType) FORM_ELEMENTS.elements[`columns_${column.name}_type`] = columnType;
                        }}
                        onChange={(columnType) => {
                          this.changeMetadata({
                            columns: {
                              ...form.columns,
                              [column.name]: {
                                ...form.columns[column.name],
                                type: columnType
                              }
                            }
                          });
                        }}
                        validations={['required']}
                        options={RASTER_COLUMN_TYPES}
                        properties={{
                          name: 'type',
                          label: 'Type',
                          default: (form.columns[column.name]) ? form.columns[column.name].type : 'continuous',
                          disabled: !adminUser,
                          readOnly: !adminUser
                        }}
                      >
                        {Select}
                      </Field>
                    </div>
                  }

                </div>
              )})}
            </div>
          }

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
