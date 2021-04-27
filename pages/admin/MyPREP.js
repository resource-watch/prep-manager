import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import Page from 'components/admin/layout/Page';
import Layout from 'components/layout/Layout';
import Tabs from 'components/ui/Tabs';
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Banner from 'components/app/common/Banner';

// My RW
import ProfilesTab from 'components/app/myprep/profiles/ProfilesTab';
import DatasetsTab from 'components/app/myprep/datasets/DatasetsTab';
import DashboardsTab from 'components/app/myprep/dashboards/DashboardsTab';
import WidgetsTab from 'components/app/myprep/widgets/WidgetsTab';
import AreasTab from 'components/app/myprep/areas/AreasTab';

// Contants
import metadata from 'constants/metadata.json';

const MYPREP_TABS = [{
  label: 'Dashboards',
  value: 'dashboards',
  route: 'admin_myprep',
  params: { tab: 'dashboards' }
}, {
  label: 'Widgets',
  value: 'widgets',
  route: 'admin_myprep',
  params: { tab: 'widgets', subtab: 'my_widgets' }
}, {
  label: 'Profile',
  value: 'profile',
  route: 'admin_myprep',
  params: { tab: 'profile' }
}];

class MyPREP extends Page {
  constructor(props) {
    super(props);

    const { url } = props;

    this.state = {
      tab: url.query.tab || 'dashboards',
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'dashboards',
      subtab: url.query.subtab
    });
  }

  componentDidMount() {
    const { url } = this.props;
    const { token } = url.query || {};

    if (token) localStorage.setItem('token', token);
  }

  getData(key, value) {
    let data = null;
    // First search for exactly match
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value === metadata[i][key]) {
        data = metadata[i];
        break;
      }
    }
    // If no data, search for close result
    if (!data) {
      for (let i = metadata.length - 1; i >= 0; i--) {
        if (value.indexOf(metadata[i][key]) > -1) {
          data = metadata[i];
          break;
        }
      }
    }

    return data;
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab } = this.state;
    const currentData = this.getData('pathname', 'myprep');

    return (
      <Layout
        title="My PREP Edit Profile"
        description="My PREP Edit Profile description"
        url={url}
        user={user}
        pageHeader
      >
        <div className="c-page-header -myprep">
          <Breadcrumbs pathname="myprep" />
          <Banner
            className="-myprep"
            bgImage={currentData.bannerBg}
            size={currentData.bannerSize}
            landing={false}
          >
            <span></span>
            <Title className="-primary -huge page-header-title -line -center" >
              {currentData.title}
            </Title>
            <Tabs
              options={MYPREP_TABS}
              defaultSelected={tab}
              selected={tab}
            />
          </Banner>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">
                {tab === 'profile' &&
                  <ProfilesTab tab={tab} subtab={subtab} />
                }

                {tab === 'datasets' &&
                  <DatasetsTab tab={tab} subtab={subtab} />
                }

                {tab === 'dashboards' &&
                  <DashboardsTab tab={tab} subtab={subtab} />
                }

                {tab === 'areas' &&
                  <AreasTab tag={tab} subtab={subtab} />
                }

                {tab === 'widgets' &&
                  <WidgetsTab tab={tab} subtab={subtab} />
                }
              </div>
            </div>
          </div>
        </div>

      </Layout>
    );
  }
}

MyPREP.defaultProps = {
};

MyPREP.propTypes = {
  url: PropTypes.object,
  user: PropTypes.object
};

export default withRedux(initStore, null, null)(MyPREP);
