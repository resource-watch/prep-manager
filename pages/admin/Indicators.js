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
import IndicatorsTab from 'components/admin/indicators/IndicatorsTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Indicators',
  value: 'indicators',
  route: 'admin_indicators',
  params: { tab: 'indicators' }
}];

class Indicators extends Page {
  constructor(props) {
    super(props);

    const { url } = props;

    this.state = {
      tab: url.query.tab || 'indicators',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'indicators',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Indicators"
        description="Indicators description..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="row">
            <div className="column small-12">
              <div className="l-container">
                <div className="page-header-content -with-tabs">
                  <Title className="-primary -huge page-header-title" >
                    Indicators
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
            <div className="column small-12">
              <div className="l-container">
                {tab === 'indicators' &&
                  <IndicatorsTab tab={tab} subtab={subtab} id={id} />
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Indicators.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object
};

export default withRedux(initStore, null, null)(Indicators);
