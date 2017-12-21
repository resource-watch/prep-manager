import React from 'react';
import PropTypes from 'prop-types';

import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';

// Constants
import { FORM_ELEMENTS } from 'components/dashboards/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Checkbox from 'components/form/Checkbox';

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
                label: 'Do you want to set this dasboard as published?',
                value: 'published',
                title: 'Published',
                defaultChecked: this.props.form.published,
                checked: this.props.form.published
              }}
            >
              {Checkbox}
            </Field>
          }
        </fieldset>

        <fieldset className="c-field-container">
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
  onChange: PropTypes.func
};

export default connect(
  state => ({
    user: state.user
  })
)(Step1);
