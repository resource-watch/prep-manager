import React from 'react';
import PropTypes from 'prop-types';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { fetchDashboard } from 'components/dashboards/detail/dashboard-detail-actions';

// components
import Page from 'components/app/layout/Page';
import EmbedLayout from 'components/app/layout/EmbedLayout';
import Spinner from 'components/ui/Spinner';
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import DashboardDetail from 'components/dashboards/detail/dashboard-detail';
import RelatedDashboards from 'components/dashboards/related-dashboards/related-dashboards';

class EmbedDashboard extends Page {
  static propTypes = {
    dashboardDetail: PropTypes.object.isRequired,
    fetchDashboard: PropTypes.func.isRequired
  }

  static defaultProps = {
    dashboardDetail: {}
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

  render() {
    const { dashboardDetail } = this.props;

    return (
      <EmbedLayout
        title={dashboardDetail.dashboard.title}
        description={dashboardDetail.dashboard.summary}
      >
        <div
          className="c-page-header -app"
          style={this.getStyle()}
        >
          <div className="l-container">
            <div className="row">
              <div className="column small-12">
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
              <div className="column small-12">
                <DashboardDetail />
              </div>
            </div>
          </div>
        </div>

        <RelatedDashboards
          data={dashboardDetail.dashboard.dashboards}
        />
      </EmbedLayout>
    );
  }
}

const mapStateToProps = state => ({
  dashboardDetail: state.dashboardDetail
});

const mapDispatchToProps = {
  fetchDashboard
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(EmbedDashboard);
