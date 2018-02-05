import React, { PureComponent } from 'react';
import HeadNext from 'next/head';

import styles from 'css/index.scss';

class Head extends PureComponent{
  static getStyles() {
    // In development, serve CSS inline (with live reloading) with webpack
    // NB: Not using dangerouslySetInnerHTML will cause problems with some CSS
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
  }

  render() {
    return (
      <HeadNext>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Partnership for Resilience and Preparedness</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=1024" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" media="all" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Serif:400,700" media="all" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" media="all" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.6/slick.css" media="all" />
        {Head.getStyles()}
      </HeadNext>
    );
  }
};

export default Head;
