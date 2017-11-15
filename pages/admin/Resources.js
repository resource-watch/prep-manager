import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Tabs from 'components/ui/Tabs';

// Tabs
import ResourcesTab from 'components/admin/resources/ResourcesTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Resources',
  value: 'resources',
  route: 'admin_resources',
  params: { tab: 'resources' }
}];

class Resources extends Page {
  constructor(props) {
    super(props);

    const { url } = props;


    this.state = {
      tab: url.query.tab || 'resources',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'resources',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Resources"
        description="Resources description..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="row">
            <div className="small-12">
              <div className="l-container">
                <div className="page-header-content -with-tabs">
                  <Title className="-primary -huge page-header-title" >
                    Resources
                  </Title>
                  <Tabs
                    options={DATA_TABS}
                    defaultSelected={tab}
                    selected={tab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="row">
            <div className="small-12">
              <div className="l-container">
                {tab === 'resources' &&
                  <ResourcesTab tab={tab} subtab={subtab} id={id} />
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Resources.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object
};

export default withRedux(initStore, null, null)(Resources);
