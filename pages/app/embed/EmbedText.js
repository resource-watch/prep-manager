import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { bindActionCreators } from 'redux';
import { getWidget } from 'redactions/widget';
import { setEmbed } from 'redactions/common';

// Components
import Page from 'components/app/layout/Page';
import EmbedLayout from 'components/app/layout/EmbedLayout';
import TextChart from 'components/widgets/charts/TextChart';
import Spinner from 'components/ui/Spinner';
import Icon from 'components/ui/Icon';

class EmbedText extends Page {
  static propTypes = {
    widget: PropTypes.object,
    getWidget: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string
  }

  static defaultProps = {
    widget: {}
  }

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { store, isServer, req } = context;

    store.dispatch(setEmbed(true));

    return {
      ...props,
      referer: isServer ? req.headers.referer : location.href
    };
  }

  isLoadedExternally() {
    return !/localhost|staging.resourcewatch.org/.test(this.props.referer);
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      modalOpened: false
    };
  }

  componentDidMount() {
    this.props.getWidget(this.props.url.query.id);
  }

  getModal() {
    const { widget } = this.props;
    const { description, metadata } = widget.attributes;
    const widgetLinks = ((metadata || []).length &&
      metadata[0].attributes.info &&
      metadata[0].attributes.info.widgetLinks) || [];
    const noAdditionalInfo = !description && !widgetLinks.length;
    return (
      <div className="widget-modal">
        { noAdditionalInfo &&
          <p>No additional information is available</p>
        }

        { widgetLinks.length > 0 &&
          <div className="widget-links-container">
            <h4>Links</h4>
            <ul>
              { widgetLinks.map(link => (
                <li key={link.link}>
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }

        { description && (
          <div>
            <h4>Description</h4>
            <p>{description}</p>
          </div>
        ) }
      </div>
    );
  }

  render() {
    const { widget, loading, error } = this.props;
    const { isLoading, modalOpened } = this.state;
    const { metadata } = widget;
    const widgetLinks = ((metadata || []).length &&
      metadata[0].attributes.info &&
      metadata[0].attributes.info.widgetLinks) || [];

    if (loading) {
      return (
        <EmbedLayout
          title="Loading widget..."
          description=""
        >
          <div className="c-embed-widget">
            <Spinner isLoading className="-light" />
          </div>
        </EmbedLayout>
      );
    }

    if (error) {
      return (
        <EmbedLayout
          title="Partnership for Resilience and Preparedness"
          description=""
        >
          <div className="c-embed-widget">
            <div className="widget-title">
              <h4>–</h4>
            </div>

            <div className="widget-content">
              <p>{'Sorry, the widget couldn\'t be loaded'}</p>
            </div>

            { this.isLoadedExternally() && (
              <div className="widget-footer">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <img
                    className="prep-logo"
                    src={'/static/images/logo-blue@2x.png'}
                    alt="Partnership for Resilience and Preparedness"
                  />
                </a>
                <div>
                  Powered by
                  <a href="http://www.resourcewatch.org/" target="_blank" rel="noopener noreferrer">
                    <img
                      className="embed-logo"
                      src={'/static/images/logo-embed.png'}
                      alt="Resource Watch"
                    />
                  </a>
                </div>
              </div>
            ) }
          </div>
        </EmbedLayout>
      );
    }

    return (
      <EmbedLayout
        title={`${widget.attributes.name}`}
        description={`${widget.attributes.description || ''}`}
      >
        <div className="c-embed-widget">
          <Spinner isLoading={isLoading} className="-light" />
          <div className="widget-title">
            {widgetLinks.length === 0 &&
              <a href={`/dataset/${widget.attributes.dataset}`} target="_blank" rel="noopener noreferrer">
                <h4>{widget.attributes.name}</h4>
              </a>
            }
            {widgetLinks.length > 0 &&
              <h4>{widget.attributes.name}</h4>
            }
            <div className="buttons">
              <button
                aria-label={`${modalOpened ? 'Close' : 'Open'} information modal`}
                onClick={() => this.setState({ modalOpened: !modalOpened })}
              >
                <Icon name={`icon-${modalOpened ? 'cross' : 'info'}`} className="c-icon -small" />
              </button>
            </div>
          </div>
          <div className="widget-content">
            <TextChart
              widgetConfig={widget.attributes.widgetConfig}
              toggleLoading={l => this.setState({ isLoading: l })}
            />
            { modalOpened && this.getModal() }
          </div>
          { this.isLoadedExternally() && (
            <div className="widget-footer">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img
                  className="prep-logo"
                  src={'/static/images/logo-blue@2x.png'}
                  alt="Partnership for Resilience and Preparedness"
                />
              </a>
              <div>
                Powered by
                <a href="http://www.resourcewatch.org/" target="_blank" rel="noopener noreferrer">
                  <img
                    className="embed-logo"
                    src={'/static/images/logo-embed.png'}
                    alt="Resource Watch"
                  />
                </a>
              </div>
            </div>
          ) }
        </div>
      </EmbedLayout>
    );
  }
}

const mapStateToProps = state => ({
  widget: state.widget.data,
  loading: state.widget.loading,
  error: state.widget.error
});

const mapDispatchToProps = dispatch => ({
  getWidget: bindActionCreators(getWidget, dispatch)
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(EmbedText);
