import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

class Head extends PureComponent {
  static getStyles() {
    return <link rel="stylesheet" type="text/css" href="/_next/static/style.css" />;
  }

  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Partnership for Resilience and Preparedness</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta name="author" content="Vizzuality" />
        <link rel="stylesheet" media="screen" href="https://fonts.googleapis.com/css?family=Lato:400,300,700" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" media="all" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Serif:400,700" media="all" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" media="all" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.6/slick.css" media="all" />
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
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Head;
