import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'utils/analytics';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { fetchDashboard } from 'components/dashboards/detail/dashboard-detail-actions';

// actions
import { setOpen, setLinks } from 'components/share-modal/share-modal-actions';

// Components
import Page from 'components/app/layout/Page';
import Layout from 'components/layout/Layout';
import Title from 'components/ui/Title';
import Icon from 'components/ui/Icon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import DashboardDetail from 'components/dashboards/detail/dashboard-detail';
import RelatedDashboards from 'components/dashboards/related-dashboards/related-dashboards';
import ShareModal from 'components/share-modal';

class DashboardsDetail extends Page {
  static propTypes = {
    setOpen: PropTypes.func,
    setLinks: PropTypes.func,
    fetchDashboard: PropTypes.func
  }

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    await context.store.dispatch(fetchDashboard({ id: props.url.query.slug }));

    return { ...props };
  }

  getStyle = () => {
    const { dashboardDetail } = this.props;

    if (dashboardDetail.dashboard.image && dashboardDetail.dashboard.image !== '/images/original/missing.png') {
      return {
        backgroundImage: `url(${dashboardDetail.dashboard.image})`
      };
    }

    return {
      backgroundImage: 'url(/static/images/dashboards/bg-dashboard.png)'
    };
  }

  componentDidMount() {
    const { origin } = window.location;
    const { dashboardDetail, setOpen } = this.props;
    const { title, slug } = dashboardDetail.dashboard;

    logEvent('Dashboards', 'Dashboard detail', title);

    this.props.setLinks({
      link: `${origin}/dashboards/${slug}`,
      embed: `${origin}/embed/dashboards/${slug}`
    });
  }

  handleShare = () => {
    this.props.setOpen(true);
  }

  render() {
    const { dashboardDetail, setOpen } = this.props;

    return (
      <Layout
        title={dashboardDetail.dashboard.title}
        description={dashboardDetail.dashboard.summary}
        url={this.props.url}
      >
        <div className="dashboard-detail">
          <div
            className="c-page-header -app"
            style={this.getStyle()}
          >
            <div className="l-container">
              <div className="row">
                <div className="column small-12">
                  <Breadcrumbs
                    className="-theme-app"
                    items={[
                      { name: 'Home', href: '/' },
                      { name: 'Dashboards', href: '/dashboards' },
                      { name: dashboardDetail.dashboard.title }
                    ]}
                  />

                  <Title className="-primary -huge page-header-title -line -center" >
                    {dashboardDetail.dashboard.title}
                  </Title>

                </div>
              </div>

              {dashboardDetail.dashboard.partner &&
                <div className="row">
                  <div className="column small-12">
                    <div className="page-header-partner">
                      <img
                        src={dashboardDetail.dashboard.partner.white_logo}
                        alt={dashboardDetail.dashboard.partner.title}
                      />
                      <p>{dashboardDetail.dashboard.partner.contact_name}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="l-section">
            <div className="l-container">
              <div className="row">
                <div className="columns small-12 medium-8">
                  <div className="toolbar-actions">
                    <div className="left" />
                    <div className="right">
                      <button
                        className="c-button -alternative -action"
                        onClick={this.handleShare}
                      >
                        <Icon name="icon-share" className="-small" />
                        share
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns small-12">
                  <DashboardDetail />
                </div>
              </div>
            </div>
          </div>

          <RelatedDashboards
            data={dashboardDetail.dashboard.dashboards}
          />

          <ShareModal />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  dashboardDetail: state.dashboardDetail
});

const mapDispatchToProps = {
  fetchDashboard,
  setOpen,
  setLinks
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DashboardsDetail);
