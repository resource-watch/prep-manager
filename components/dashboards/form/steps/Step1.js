import React from 'react';
import PropTypes from 'prop-types';

import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';

// Constants
import { FORM_ELEMENTS, TEMPLATES } from 'components/dashboards/form/constants';
import TOPICS from 'static/data/TopicsTreeLite.json';
import GEOGRAPHIES from 'static/data/GeographiesTreeLite.json';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Select from 'components/form/SelectInput';
import TextArea from 'components/form/TextArea';
import Checkbox from 'components/form/Checkbox';
import FileImage from 'components/form/FileImage';
import TreeSelector from 'components/form/tree-selector';

// Helpers
import { setInitialTreeState } from 'components/form/tree-selector/tree-selector-helper';

// Wysiwyg
import Wysiwyg from 'components/form/VizzWysiwyg';
import WidgetBlock from 'components/dashboards/wysiwyg/widget-block/widget-block';
import WidgetBlockEdition from 'components/dashboards/wysiwyg/widget-block-edition/widget-block-edition';
import ToolBlock from 'components/dashboards/wysiwyg/tool-block/tool-block';
import ToolBlockEdition from 'components/dashboards/wysiwyg/tool-block-edition/tool-block-edition';
import InsightBlock from 'components/dashboards/wysiwyg/insight-block/insight-block';
import InsightBlockEdition from 'components/dashboards/wysiwyg/insight-block-edition/insight-block-edition';


class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      form: props.form,
      template: null
    };

    this.onChangeTemplate = this.onChangeTemplate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ form: nextProps.form });
  }

  onChangeTemplate(value) {
    const { child: wysiwyg } = FORM_ELEMENTS.elements.content;
    const template = TEMPLATES.find(t => t.value === value);

    wysiwyg.setValue(JSON.stringify(template.content));
  }

  render() {
    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    return (
      <div>
        <fieldset className="c-field-container">
          {/* NAME */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.title = c; }}
            onChange={value => this.props.onChange({ title: value })}
            validations={['required']}
            className="-fluid"
            properties={{
              name: 'title',
              label: 'Name',
              type: 'text',
              required: true,
              default: this.state.form.title
            }}
          >
            {Input}
          </Field>

          {/* SUMMARY */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.summary = c; }}
            onChange={value => this.props.onChange({ summary: value })}
            className="-fluid"
            properties={{
              name: 'summary',
              label: 'Summary',
              rows: '6',
              default: this.state.form.summary
            }}
          >
            {TextArea}
          </Field>

          {/* PUBLISHED */}
          {!this.props.basic &&
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
              onChange={value => this.props.onChange({
                published: value.checked
              })}
              properties={{
                name: 'published',
                label: 'Do you want to set this dashboard as published?',
                value: 'published',
                title: 'Published',
                defaultChecked: this.props.form.published,
                checked: this.props.form.published
              }}
            >
              {Checkbox}
            </Field>
          }
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.preproduction = c; }}
            onChange={value => this.props.onChange({
              preproduction: value.checked
            })}
            properties={{
              name: 'preproduction',
              label: 'Do you want to set this dashboard as pre-production?',
              value: 'preproduction',
              title: 'Pre-production',
              defaultChecked: this.props.form.preproduction,
              checked: this.props.form.preproduction
            }}
          >
            {Checkbox}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.production = c; }}
            onChange={value => this.props.onChange({
              production: value.checked
            })}
            properties={{
              name: 'production',
              label: 'Do you want to set this dashboard as production?',
              value: 'production',
              title: 'Production',
              defaultChecked: this.props.form.production,
              checked: this.props.form.production
            }}
          >
            {Checkbox}
          </Field>
          {/* TOPICS */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.tags = c; }}
            onChange={value => this.props.onChange({ tags: value })}
            data={this.props.topics}
            className="-fluid"
            properties={{
              name: 'tags',
              label: 'Topics',
              required: false,
              default: this.state.form.tags,
              value: this.state.form.tags
            }}
          >
            {TreeSelector}
          </Field>
          {/* GEOGRAPHIES */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.tags = c; }}
            onChange={value => this.props.onChange({ locations: value })}
            data={this.props.geographies}
            className="-fluid"
            properties={{
              name: 'locations',
              label: 'Geographies',
              required: false,
              default: this.state.form.locations,
              value: this.state.form.locations
            }}
          >
            {TreeSelector}
          </Field>

          {/* AUTHOR */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.author = c; }}
            onChange={value => this.props.onChange({
              author_attributes: Object.assign({}, this.props.form.author_attributes, { name: value })
            })}
            validations={['required']}
            className="-fluid"
            properties={{
              name: 'author',
              label: 'Author',
              type: 'text',
              required: true,
              default: this.state.form.author && this.state.form.author.name
            }}
          >
            {Input}
          </Field>

          {/* AUTHOR */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.authorUrl = c; }}
            onChange={value => this.props.onChange({
              author_attributes: Object.assign({}, this.props.form.author_attributes, { url: value })
            })}
            validations={['url']}
            className="-fluid"
            properties={{
              name: 'authorUrl',
              label: 'Author\'s website',
              type: 'text',
              required: false,
              default: this.state.form.author && this.state.form.author.url
            }}
          >
            {Input}
          </Field>

          {/* IMAGE */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.authorImg = c; }}
            onChange={value => this.props.onChange({
              author_attributes: Object.assign({}, this.props.form.author_attributes, { logo: value })
            })}
            className="-fluid"
            properties={{
              name: 'authorImg',
              label: 'Author\'s logo',
              placeholder: 'Browse file',
              default: (this.state.form.author && this.state.form.author.logo && this.state.form.author.logo !== '/logos/original/missing.png')
                ? this.state.form.author.logo
                : null
            }}
          >
            {FileImage}
          </Field>
        </fieldset>

        <fieldset className="c-field-container">
          {/* TEMPLATE */}
          <Field
            onChange={this.onChangeTemplate}
            className="-fluid"
            options={TEMPLATES}
            properties={{
              name: 'templates',
              label: 'Templates',
              instanceId: 'selectTemplates'
            }}
          >
            {Select}
          </Field>
          {/* CONTENT */}
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.content = c; }}
            onChange={value => this.props.onChange({ content: value })}
            validations={['required']}
            className="-fluid"
            properties={{
              name: 'content',
              label: 'Content',
              required: true,
              default: this.state.form.content,
              blocks: {
                widget: {
                  Component: WidgetBlock,
                  EditionComponent: WidgetBlockEdition,
                  icon: 'icon-widget',
                  label: 'Widget',
                  renderer: 'modal'
                },
                tool: {
                  Component: ToolBlock,
                  EditionComponent: ToolBlockEdition,
                  icon: 'icon-metadata',
                  label: 'Tool',
                  renderer: 'modal'
                },
                insight: {
                  Component: InsightBlock,
                  EditionComponent: InsightBlockEdition,
                  icon: 'icon-metadata',
                  label: 'Story',
                  renderer: 'modal'
                }
              },
              onUploadImage: files => new Promise((resolve, reject) => {
                const file = files[0];
                const formData = new FormData();
                formData.append('image', file);

                fetch(`${process.env.API_URL}/temporary_content_images`, {
                  method: 'POST',
                  headers: {
                    Authorization: this.props.user.token
                  },
                  body: formData
                })
                  .then(response => response.json())
                  .then((response) => {
                    resolve(response.url);
                  })
                  .catch((e) => {
                    toastr.error('Error', 'We couldn\'t upload the image. Try again');
                    reject(e);
                  });
              })
            }}
          >
            {Wysiwyg}
          </Field>
        </fieldset>
      </div>
    );
  }
}

Step1.propTypes = {
  id: PropTypes.string,
  form: PropTypes.object,
  basic: PropTypes.bool,
  user: PropTypes.object,
  topics: PropTypes.array,
  geographies: PropTypes.array,
  onChange: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  topics: setInitialTreeState(TOPICS, (ownProps.form && ownProps.form.tags) || []),
  geographies: setInitialTreeState(GEOGRAPHIES, (ownProps.form &&ownProps.form.locations) || [])
});

export default connect(mapStateToProps)(Step1);
