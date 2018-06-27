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
import CoreDatasetsTab from 'components/admin/coredatasets/CoreDatasetsTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Core datasets',
  value: 'core-datasets',
  route: 'admin_core_datasets',
  params: { tab: 'core-datasets' }
}];

class CoreDatasets extends Page {
  constructor(props) {
    super(props);

    const { url } = props;

    this.state = {
      tab: url.query.tab || 'core-datasets',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'core-datasets',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Core Datasets"
        description="Core Datasets description..."
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
                    Core Datasets
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
                {tab === 'core-datasets' &&
                  <CoreDatasetsTab tab={tab} subtab={subtab} id={id} />
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

CoreDatasets.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object
};

export default withRedux(initStore, null, null)(CoreDatasets);
