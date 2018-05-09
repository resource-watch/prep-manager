import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

// Styles
import styles from 'css/index.scss';

export default class Head extends React.Component {
  static getStyles() {
    // In development, serve CSS inline (with live reloading) with webpack
    // NB: Not using dangerouslySetInnerHTML will cause problems with some CSS
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
  }

  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <title>{title} | PReP Content Manager</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vizzuality" />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="stylesheet" media="screen" href="https://fonts.googleapis.com/css?family=Lato:400,300,700" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
        {Head.getStyles()}
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" />
        <script
          src="https://unpkg.com/esri-leaflet@2.1.4/dist/esri-leaflet.js"
          integrity="sha512-m+BZ3OSlzGdYLqUBZt3u6eA0sH+Txdmq7cqA1u8/B2aTXviGMMLOfrKyiIW7181jbzZAY0u+3jWoiL61iLcTKQ=="
          crossOrigin=""
        />
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
      </HeadNext>
    );
  }
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
