import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'utils/analytics';
import Button from 'components/ui/Button';

import styles from './share-url-styles.scss';

class ShareUrl extends React.Component {
  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  onCopyClick() {
    this.input.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });

      if (this.props.analytics) {
        logEvent(this.props.analytics.category, this.props.analytics.action, `Clicks to copy ${this.props.iframe ? 'embed' : 'link'}`);
      }

      setTimeout(() => {
        this.setState({ copied: false });
        this.input.blur();
      }, 2000);
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    const { copied } = this.state;

    let url = this.props.links[this.props.url] || this.props.url;

    if (this.props.iframe) {
      url = `<iframe width="100%" height="600px" src="${url}"></iframe>`;
    }

    return (
      <div className="c-share-url">
        <style jsx>{`${styles}`}</style>
        <div className="url-container">
          <input ref={(node) => { this.input = node; }} value={url} className="url" readOnly />
          <Button
            onClick={() => this.onCopyClick()}
            properties={{
              className: '-primary'
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>
    );
  }
}

ShareUrl.propTypes = {
  /**
   * Urls to generate
   */
  url: PropTypes.string,
  /**
   * Set if the url will be inside a iframe
   */
  iframe: PropTypes.bool,
  /**
   * Short urls generated
   */
  links: PropTypes.object,
  /**
   * Define the category and action for the analytics
   * event
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};


export default ShareUrl;
