import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setUser } from 'redactions/user';
import { setRouter } from 'redactions/routes';

// Components
import Page from 'components/app/layout/Page';
import EmbedLayout from 'components/app/layout/EmbedLayout';
import Spinner from 'components/ui/Spinner';
import Icon from 'components/ui/Icon';

class EmbedTable extends Page {
  static getInitialProps({ asPath, pathname, query, req, store, isServer }) {
    const { user } = isServer ? req : store.getState();
    const url = { asPath, pathname, query };
    const referer = isServer ? req.headers.referer : location.href;
    store.dispatch(setUser(user));
    store.dispatch(setRouter(url));
    return { user, isServer, url, referer, isLoading: true };
  }

  isLoadedExternally() {
    return !/localhost|staging.resourcewatch.org/.test(this.props.referer);
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      error: false,
      tableData: [],
      modalOpened: false
    };
  }

  componentDidMount() {
    const query = this.props.url.query.queryURL;
    if (query) {
      this.loadTableData(query);
    }
  }

  loadTableData(query) {
    fetch(query, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          isLoading: false,
          error: false,
          tableData: response.data
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, error: true });
        console.error(error);
      });
  }

  render() {
    const { isLoading, error, tableData, modalOpened } = this.state;

    const header = tableData && tableData.length > 0 && Object.keys(tableData[0]);

    if (isLoading) {
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
        title="Table data"
        description=""
      >
        <div className="c-embed-widget">
          <Spinner isLoading={isLoading} className="-light" />
          <div className="widget-title">
            <h4>Table data</h4>
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
            <div className="c-table">
              {tableData &&
                <table>
                  <thead>
                    <tr>
                      {header && header.map(val => <th key={`header_${val}`}>{val}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData && tableData.length && tableData.length > 0 &&
                      tableData.map((row, i) =>
                        (
                          <tr
                            key={`row${i}`} // eslint-disable-line react/no-array-index-key
                          >
                            {
                              Object.keys(row).map(column => (<td key={`td${column}`}>{row[column]}</td>))
                            }
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </table>
              }
            </div>
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

EmbedTable.propTypes = {
  queryURL: PropTypes.object,
  isLoading: PropTypes.bool
};

EmbedTable.defaultProps = {
  isLoading: true
};

export default withRedux(initStore, null, null)(EmbedTable);
