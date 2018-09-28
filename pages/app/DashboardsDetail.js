import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'utils/analytics';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { fetchDashboard } from 'components/dashboards/detail/dashboard-detail-actions';

// Toastr
import { toastr } from 'react-redux-toastr';

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
    const { dashboardDetail } = this.props;
    const { title, slug } = dashboardDetail.dashboard;

    logEvent('Dashboards', 'Dashboard detail', title);

    this.props.setLinks({
      link: `${origin}/dashboards/${slug}`,
      embed: `${origin}/embed/dashboard/${slug}`
    });
  }

  handleShare = () => {
    this.props.setOpen(true);
  }

  handleDownloadPDF = () => {
    toastr.info('Dashboard download', 'The file is being generated...');

    const { dashboard } = this.props.dashboardDetail;
    const { origin } = window.location;
    const filename = encodeURIComponent(dashboard.title);

    const link = document.createElement('a');
    link.setAttribute('download', '');
    link.href = `${process.env.CONTROL_TOWER_URL}/v1/webshot/pdf?filename=${filename}&width=790&height=580&waitFor=8000&url=${origin}/embed/dashboard/${dashboard.slug}`;
    // testing
    // link.href = `${process.env.CONTROL_TOWER_URL}/v1/webshot/pdf?filename=${filename}&width=790&height=580&waitFor=8000&url=https://prepdata.org/embed/dashboard/forestry-in-madhya-pradesh`;


    // link.click() doesn't work on Firefox for some reasons
    // so we have to create an event manually
    const event = new MouseEvent('click');
    link.dispatchEvent(event);
  }

  render() {
    const { dashboardDetail } = this.props;

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

              {dashboardDetail.dashboard.author && dashboardDetail.dashboard.author.name && (
                <div className="row">
                  <div className="column small-12">
                    <div className="page-header-partner">
                      <img
                        src={dashboardDetail.dashboard.author.logo}
                        alt={dashboardDetail.dashboard.author.name}
                      />
                      <p>{dashboardDetail.dashboard.author.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="l-section">
            <div className="l-container">
              <div className="row">
                <div className="columns small-12">
                  <div className="toolbar-actions">
                    <button
                      className="c-button -alternative -action"
                      onClick={this.handleShare}
                    >
                      <Icon name="icon-share" className="-small" />
                      share
                    </button>

                    <button
                      className="c-button -alternative -action"
                      onClick={this.handleDownloadPDF}
                    >
                      <Icon name="icon-download" className="-small" />
                      download as PDF
                    </button>
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
