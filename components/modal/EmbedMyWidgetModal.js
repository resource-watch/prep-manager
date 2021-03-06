import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

class EmbedMyWidgetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  onCopyClick() {
    const copyTextarea = this.input;
    copyTextarea.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });
    } catch (err) {
      toastr.warning('Oops, unable to copy');
    }
  }

  /**
   * Return the type of embed
   * @return {string}
   */
  getEmbedType() {
    const { visualizationType } = this.props;

    if (visualizationType === 'map') {
      return 'map';
    } else if (visualizationType === 'embed') {
      return 'embed';
    }

    return 'widget';
  }

  render() {
    const { widget } = this.props;
    const { id } = widget;
    const { protocol, hostname, port } = window && window.location ? window.location : {};
    const embedHost = window && window.location ? `${protocol}//${hostname}${port !== '' ? `:${port}` : port}` : '';
    const url = `${embedHost}/embed/${this.getEmbedType()}/${id}`;
    const iframeText = `<iframe src="${url}" width="100%" height="474" frameBorder="0"></iframe>`;
    return (
      <div className="c-embed-my-widget-modal">
        <h2>Share into my web</h2>
        <p>You may include this content on your webpage. To do this, copy the following html
        code and insert it into the source code of your page:</p>
        <div className="url-container">
          <input ref={(n) => { this.input = n; }} value={iframeText} className="url" readOnly />
          <button className="c-btn -primary" onClick={() => this.onCopyClick()}>
            Copy
          </button>
        </div>
      </div>
    );
  }
}

EmbedMyWidgetModal.propTypes = {
  widget: PropTypes.object.isRequired,
  visualizationType: PropTypes.string.isRequired
};

export default EmbedMyWidgetModal;
