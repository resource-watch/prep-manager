import React from 'react';
import PropTypes from 'prop-types';
import compact from 'lodash/compact';

// Redux
import { connect } from 'react-redux';


// Constants
import { PROVIDER_TYPES_DICTIONARY, FORM_ELEMENTS, DATASET_TYPES } from 'components/datasets/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import File from 'components/form/File';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';
import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';


class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset,
      form: props.form,
      carto: {},
      document: {}
    };

    // BINDINGS
    this.onCartoFieldsChange = this.onCartoFieldsChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ form: nextProps.form });
  }

  /**
    * UI EVENTS
    * - onCartoFieldsChange
    * - onLegendChange
  */
  onCartoFieldsChange() {
    const { cartoAccountUsername, tableName } = this.state.carto;
    const connectorUrl = `https://${cartoAccountUsername}.carto.com/tables/${tableName}/public`;

    this.props.onChange({
      connectorUrl
    });
  }

  onLegendChange(obj) {
    const legend = Object.assign({}, this.props.form.legend, obj);
    this.props.onChange({ legend });
  }

  onPublishedChange = (value) => {
    if (value.checked) {
      const newPublished = this.state.form.published;
      newPublished.push('rw');
      this.props.onChange({ published: newPublished });
    } else {
      this.props.onChange({ published: this.state.form.published.filter(app =>
        app !== process.env.APPLICATIONS) });
    }
  }

  /**
   * HELPERS
   * - setProviderOptions
  */
  setProviderOptions() {
    const { basic, dataset } = this.props;

    const options = Object.keys(PROVIDER_TYPES_DICTIONARY).map((key) => {
      if (basic && !dataset) {
        if (PROVIDER_TYPES_DICTIONARY[key].basic) {
          return {
            label: PROVIDER_TYPES_DICTIONARY[key].label,
            value: PROVIDER_TYPES_DICTIONARY[key].value
          };
        }

        return null;
      }

      return {
        label: PROVIDER_TYPES_DICTIONARY[key].label,
        value: PROVIDER_TYPES_DICTIONARY[key].value
      };
    });

    return (basic) ? compact(options) : options;
  }


  render() {
    const { user, columns, loadingColumns, basic } = this.props;
    const { dataset } = this.state;
    const { provider, columnFields, published } = this.state.form;

    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    const isCarto = (provider === 'cartodb');
    const isGee = (provider === 'gee');
    const isNextGDDP = (provider === 'nexgddp');
    const isFeatureservice = (provider === 'featureservice');
    const isJson = (provider === 'json');
    const isCsv = (provider === 'csv');
    const isTsv = (provider === 'tsv');
    const isXml = (provider === 'xml');
    const isWMS = (provider === 'wms');
    const isDocument = (isJson || isXml || isCsv || isTsv);

    const columnFieldsOptions = (columnFields || []).map(f => ({ label: f, value: f }));
    const isPublished = published.includes(process.env.APPLICATIONS);

    return (
      <div>
        <fieldset className="c-field-container">
          {(user.role === 'ADMIN' && !basic) &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.env = c; }}
              hint={'Choose "preproduction" to see this dataset it only as admin, "production" option will show it in public site.'}
              className="-fluid"
              options={[{ label: 'Pre-production', value: 'preproduction' }, { label: 'Production', value: 'production' }]}
              onChange={value => this.props.onChange({ env: value })}
              properties={{
                name: 'env',
                label: 'Environment',
                placeholder: 'Type the columns...',
                noResultsText: 'Please, type the name of the columns and press enter',
                promptTextCreator: label => `The name of the column is "${label}"`,
                default: 'preproduction',
                value: this.props.form.env
              }}
            >
              {Select}
            </Field>}
          {(user.role === 'ADMIN' && !basic) &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
              onChange={value => this.props.onChange({
                published: value.checked ? [process.env.APPLICATIONS] : []
              })}
              validations={['required']}
              properties={{
                name: 'published',
                label: 'Do you want to set this dataset as published?',
                value: isPublished,
                title: 'Published',
                defaultChecked: (!dataset) ? user.role === 'ADMIN' : isPublished
              }}
            >
              {Checkbox}
            </Field>
          }

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
            onChange={value => this.props.onChange({ name: value })}
            validations={['required']}
            className="-fluid"
            properties={{
              name: 'name',
              label: 'Title',
              type: 'text',
              required: true,
              default: this.state.form.name
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.subtitle = c; }}
            onChange={value => this.props.onChange({ subtitle: value })}
            className="-fluid"
            properties={{
              name: 'subtitle',
              label: 'Subtitle',
              type: 'text',
              default: this.state.form.subtitle
            }}
          >
            {Input}
          </Field>

          {user.role === 'ADMIN' && !basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.type = c; }}
              onChange={(value) => {
                this.props.onChange({
                  type: value,
                  ...(value === 'raster') && { geoInfo: true }
                });
              }}
              className="-fluid"
              validations={['required']}
              options={DATASET_TYPES}
              hint={`
                <ul>
                  <li>Tabular: Dataset contains table formatted data. Providers available: Carto, Gee, Feature Service, csv, json tsv and xml</li>
                  <li>Raster: Dataset is an image. Only Google Earth Engine, wms and Carto connectors can hold raster data</li>
                </ul>
              `}
              properties={{
                name: 'type',
                label: 'Type',
                default: this.state.form.type,
                value: this.state.form.type,
                disabled: !!this.state.dataset,
                required: true,
                instanceId: 'selectType'
              }}
            >
              {Select}
            </Field>
          }

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.geoInfo = c; }}
            onChange={value => this.props.onChange({ geoInfo: value.checked })}
            validations={['required']}
            properties={{
              name: 'geoInfo',
              label: 'Does this dataset contain geographical features such as points, polygons or lines?',
              value: 'geoInfo',
              title: 'Yes',
              disabled: (this.state.form.type === 'raster'),
              defaultChecked: this.props.form.geoInfo,
              checked: this.props.form.geoInfo
            }}
          >
            {Checkbox}
          </Field>


          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.provider = c; }}
            onChange={(value) => {
              this.props.onChange({
                provider: value,
                connectorUrl: '',
                legend: {
                  lat: undefined,
                  long: undefined,
                  date: [],
                  country: []
                },
                connectorType: (PROVIDER_TYPES_DICTIONARY[value]) ?
                  PROVIDER_TYPES_DICTIONARY[value].connectorType : null,
                columnFields: null
              });
            }}
            className="-fluid"
            validations={['required']}
            options={this.setProviderOptions()}
            hint={`
              <span>While only tabular data can be uploaded directly into PREPdata, the platform also supports vector and raster datasets hosted on platforms like ArcGIS, CARTO, GEE, and others. If you have an account with one of these services and would like to connect a dataset, or if you need any assistance, we’d be happy to help. <a href="https://docs.google.com/forms/d/1wZzQno3De7Ul6vlOkkdHhWK_9csErSrOlo6pOAZHIds/viewform?edit_requested=true" target="_blank">Contact us</a>.</span>
              <ul>
                <li>Tabular: Dataset contains table formatted data. Providers available: csv, json tsv and xml</li>
              </ul>
            `}
            properties={{
              name: 'provider',
              label: 'Format',
              default: this.state.form.provider,
              value: this.state.form.provider,
              disabled: !!this.state.dataset,
              required: true,
              instanceId: 'selectProvider'
            }}
          >
            {Select}
          </Field>

          {/*
            *****************************************************
            ****************** CARTODB FIELDS * ***************
            *****************************************************
          */}
          {isCarto && !dataset &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.cartoAccountUsername = c; }}
              onChange={(value) => {
                this.setState({
                  carto: {
                    ...this.state.carto,
                    cartoAccountUsername: value
                  }
                }, () => {
                  this.onCartoFieldsChange('cartoAccountUsername', value);
                });
              }}
              validations={['required']}
              className="-fluid"
              properties={{
                name: 'cartoAccountUsername',
                label: 'Carto account username',
                type: 'text',
                default: this.state.form.cartoAccountUsername,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {isCarto && !dataset &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.tableName = c; }}
              onChange={(value) => {
                this.setState({
                  carto: {
                    ...this.state.carto,
                    tableName: value
                  }
                }, () => {
                  this.onCartoFieldsChange('tableName', value);
                });
              }}
              validations={['required']}
              className="-fluid"
              properties={{
                name: 'tableName',
                label: 'Table name',
                type: 'text',
                default: this.state.form.tableName,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {isCarto && !!dataset &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.connectorUrl = c; }}
              className="-fluid"
              properties={{
                name: 'connectorUrl',
                label: 'connectorUrl',
                type: 'text',
                default: this.state.form.connectorUrl,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {/*
            *****************************************************
            ****************** GEE FIELDS * ***************
            *****************************************************
          */}
          {isGee &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.tableName = c; }}
              onChange={value => this.props.onChange({ tableName: value })}
              validations={['required']}
              className="-fluid"
              hint="Please add fusion table (ft:id) or an image. Example: projects/wri-datalab/HansenComposite_14-15`"
              properties={{
                name: 'tableName',
                label: 'Table name',
                type: 'text',
                default: this.state.form.tableName,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {/*
            *****************************************************
            ****************** NEXTGDDP FIELDS * ***************
            *****************************************************
          */}
          {isNextGDDP &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.tableName = c; }}
              onChange={value => this.props.onChange({ tableName: value })}
              validations={['required']}
              className="-fluid"
              hint="Please verify that the scenario and model is already incorporated in Rasdaman. Example: scenario/model"
              properties={{
                name: 'tableName',
                label: 'Table name',
                type: 'text',
                default: this.state.form.tableName,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {/*
            *****************************************************
            ****************** FEATURE SERVICE ****************
            *****************************************************
          */}
          {isFeatureservice &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.connectorUrl = c; }}
              onChange={value => this.props.onChange({ connectorUrl: value })}
              validations={['required', 'url']}
              className="-fluid"
              hint="Example: http://gis-gfw.wri.org/arcgis/rest/services/prep/nex_gddp_indicators/MapServer/6?f=pjson"
              properties={{
                name: 'connectorUrl',
                label: 'Url data endpoint',
                type: 'text',
                default: this.state.form.connectorUrl,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {/*
            *****************************************************
            ****************** WMS ****************
            *****************************************************
          */}
          {isWMS &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.connectorUrl = c; }}
              onChange={value => this.props.onChange({ connectorUrl: value })}
              className="-fluid"
              hint="This connector will only display the data as a wms map layer. The data will not be available through queries."
              properties={{
                name: 'connectorUrl',
                label: 'Url data endpoint',
                type: 'text',
                default: this.state.form.connectorUrl,
                disabled: !!this.state.dataset
              }}
            >
              {Input}
            </Field>
          }

          {/*
            *****************************************************
            ****************** DOCUMENT ****************
            *****************************************************
          */}

          {isDocument && user.role === 'ADMIN' && !basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.verified = c; }}
              onChange={value => this.props.onChange({ verified: value.checked })}
              validations={['required']}
              properties={{
                name: 'verified',
                label: 'Is this dataset verified?',
                value: 'verified',
                title: 'Verified',
                checked: this.props.form.verified
              }}
            >
              {Checkbox}
            </Field>
          }

          {isDocument && !dataset &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.connectorUrl = c; }}
              onChange={({ fields, value }) => {
                this.props.onChange({
                  connectorUrl: value,
                  ...!!fields && { columnFields: fields }
                });
              }}
              validations={['required', 'url']}
              className="-fluid"
              properties={{
                name: 'connectorUrl',
                label: 'Url data endpoint / File',
                type: 'text',
                placeholder: 'Paste a URL here or browse file',
                authorization: this.state.form.authorization,
                provider: this.state.form.provider,
                default: this.state.form.connectorUrl,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {File}
            </Field>
          }

          {isDocument && !!dataset &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.connectorUrl = c; }}
              onChange={(value) => {
                this.props.onChange({ connectorUrl: value });
              }}
              validations={['required', 'url']}
              className="-fluid"
              properties={{
                name: 'connectorUrl',
                label: 'Url data endpoint / File',
                type: 'text',
                default: this.state.form.connectorUrl,
                disabled: !!this.state.dataset,
                required: true
              }}
            >
              {Input}
            </Field>
          }

          {(isJson || isXml) &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.dataPath = c; }}
              onChange={value => this.props.onChange({ dataPath: value })}
              hint="Name of the element that you want to import"
              validations={(isXml) ? ['required'] : []}
              className="-fluid"
              properties={{
                name: 'dataPath',
                label: 'Data path',
                type: 'text',
                default: this.state.form.dataPath,
                disabled: !!this.state.dataset,
                required: isXml
              }}
            >
              {Input}
            </Field>
          }

          {isDocument && columnFields &&
            <div className="c-field-row">
              <div className="row l-row">
                <div className="column small-12 medium-6">
                  <Field
                    ref={(c) => { if (c) FORM_ELEMENTS.elements.lat = c; }}
                    onChange={value => this.onLegendChange({ lat: value })}
                    hint="Name of column with latitude value"
                    options={columnFieldsOptions}
                    className="-fluid"
                    properties={{
                      name: 'lat',
                      label: 'Latitude',
                      type: 'text',
                      placeholder: 'Select or type the column...',
                      disabled: !!this.state.dataset,
                      default: this.state.form.legend.lat
                    }}
                  >
                    {Select}
                  </Field>
                </div>

                <div className="column small-12 medium-6">
                  <Field
                    ref={(c) => { if (c) FORM_ELEMENTS.elements.long = c; }}
                    onChange={value => this.onLegendChange({ long: value })}
                    hint="Name of column with longitude value"
                    options={columnFieldsOptions}
                    className="-fluid"
                    properties={{
                      name: 'long',
                      label: 'Longitude',
                      type: 'text',
                      placeholder: 'Select or type the column...',
                      disabled: !!this.state.dataset,
                      default: this.state.form.legend.long
                    }}
                  >
                    {Select}
                  </Field>
                </div>

                <div className="column small-12 medium-6">
                  <Field
                    ref={(c) => { if (c) FORM_ELEMENTS.elements.date = c; }}
                    onChange={value => this.onLegendChange({ date: value })}
                    hint="Name of columns with date value (ISO Format)"
                    options={columnFieldsOptions}
                    className="-fluid"
                    properties={{
                      name: 'date',
                      label: 'Date',
                      type: 'text',
                      disabled: !!this.state.dataset,
                      placeholder: 'Select or type the column..'
                    }}
                  >
                    {Select}
                  </Field>
                </div>

                <div className="column small-12 medium-6">
                  <Field
                    ref={(c) => { if (c) FORM_ELEMENTS.elements.country = c; }}
                    onChange={value => this.onLegendChange({ country: value })}
                    hint="Name of columns with country value (ISO3 code)"
                    options={columnFieldsOptions}
                    className="-fluid"
                    properties={{
                      name: 'country',
                      label: 'Country',
                      type: 'text',
                      disabled: !!this.state.dataset,
                      placeholder: 'Select or type the column...'
                    }}
                  >
                    {Select}
                  </Field>
                </div>
              </div>
            </div>
          }
        </fieldset>

        {this.state.form.provider && dataset &&
          <fieldset className="c-field-container">
            <Title className="-default -secondary">
              Relevant Columns
            </Title>

            {loadingColumns &&
              <Spinner className="-inline" isLoading={loadingColumns} />
            }

            {!loadingColumns && !columns.length &&
              <p>No columns</p>
            }

            {!!columns.length &&
              <div className="c-field-row">
                <div className="l-row row">
                  <div className="column small-12 medium-6">
                    <Field
                      options={columns.map(c => ({ label: c.name, value: c.name }))}
                      ref={(c) => { if (c) FORM_ELEMENTS.elements.widgetRelevantProps = c; }}
                      onChange={value => this.props.onChange({ widgetRelevantProps: value })}
                      className="-fluid"
                      properties={{
                        name: 'widgetRelevantProps',
                        label: 'Widget relevant columns',
                        multi: true,
                        instanceId: 'selectWidgetRelevantProps',
                        placeholder: 'Select the dataset columns...',
                        default: this.state.form.widgetRelevantProps.map(
                          column => ({ label: column, value: column })
                        ),
                        value: this.state.form.widgetRelevantProps.map(
                          column => ({ label: column, value: column })
                        )
                      }}
                    >
                      {Select}
                    </Field>
                  </div>

                  <div className="column small-12 medium-6">
                    <Field
                      options={columns.map(c => ({ label: c.name, value: c.name }))}
                      ref={(c) => { if (c) FORM_ELEMENTS.elements.layerRelevantProps = c; }}
                      onChange={value => this.props.onChange({ layerRelevantProps: value })}
                      className="-fluid"
                      properties={{
                        name: 'layerRelevantProps',
                        label: 'Layer relevant columns',
                        multi: true,
                        instanceId: 'selectLayerRelevantProps',
                        placeholder: 'Select the dataset columns...',
                        default: this.state.form.layerRelevantProps.map(
                          column => ({ label: column, value: column })
                        ),
                        value: this.state.form.layerRelevantProps.map(
                          column => ({ label: column, value: column })
                        )
                      }}
                    >
                      {Select}
                    </Field>
                  </div>
                </div>
              </div>
            }
          </fieldset>
        }
      </div>
    );
  }
}

Step1.propTypes = {
  dataset: PropTypes.string,
  form: PropTypes.object,
  columns: PropTypes.array,
  loadingColumns: PropTypes.bool,
  basic: PropTypes.bool,
  onChange: PropTypes.func,

  // Store
  user: PropTypes.object.isRequired
};

Step1.defaultProps = {
  basic: false
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Step1);
