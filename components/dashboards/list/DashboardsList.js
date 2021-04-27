import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { logEvent } from 'utils/analytics';

// Services
import DashboardsService from 'services/DashboardsService';
import { toastr } from 'react-redux-toastr';

// Redux
import { connect } from 'react-redux';
import { getDashboards, deleteDashboard, setFilters } from 'redactions/admin/dashboards';

// Selectors
import getFilteredDashboards from 'selectors/admin/dashboards';

// Components
import Spinner from 'components/ui/Spinner';
import SearchInput from 'components/ui/SearchInput';
import DashboardsListCard from 'components/dashboards/list/DashboardsListCard';

class DashboardsList extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.logSearchEvent = debounce(this.logSearchEvent, 500);

    // SERVICES
    this.service = new DashboardsService();
  }

  componentDidMount() {
    const { getDashboardsFilters } = this.props;

    this.props.setFilters([]);
    this.props.getDashboards({
      filters: getDashboardsFilters
    });
  }

  /**
   * UI EVENTS
   * - onSearch
  */
  onSearch(value) {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'title', value }]);
      this.logSearchEvent(value);
    }
  }

  onDelete(dashboard) {
    toastr.confirm(`Are you sure that you want to delete: "${dashboard.title}"`, {
      onOk: () => {
        this.props.deleteDashboard(dashboard.id)
          .then(() => {
            const { getDashboardsFilters } = this.props;

            this.props.setFilters([]);
            this.props.getDashboards({
              filters: getDashboardsFilters
            });
            toastr.success('Success', `The dashboard "${dashboard.id}" - "${dashboard.title}" has been removed correctly`);
          })
          .catch((err) => {
            toastr.error('Error', `The dashboard "${dashboard.id}" - "${dashboard.title}" was not deleted. Try again. ${err}`);
          });
      }
    });
  }

  /**
   * Log the search events
   * NOTE: this function is debounced in the constructor
   * @param {string} query Search terms
   */
  logSearchEvent(query) { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Search dashboards', query);
  }

  render() {
    const { dashboards, routes } = this.props;

    return (
      <div className="c-dashboard-list">
        <Spinner className="-light" isLoading={this.props.loading} />

        <SearchInput
          input={{
            placeholder: 'Search dashboard'
          }}
          helpLink
          link={{
            label: 'New dashboard',
            route: routes.detail,
            params: { tab: 'dashboards', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        <div className="l-row row list">
          {dashboards.map(dashboard => (
            <div
              className="column list-item small-12 medium-4"
              key={dashboard.id}
            >
              <DashboardsListCard
                dashboard={dashboard}
                routes={routes}
                onDelete={this.onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DashboardsList.defaultProps = {
  routes: {
    index: '',
    detail: ''
  },
  getDashboardsFilters: {},
  // Store
  dashboards: []
};

DashboardsList.propTypes = {
  routes: PropTypes.object,
  getDashboardsFilters: PropTypes.object,

  // Store
  dashboards: PropTypes.array.isRequired,
  loading: PropTypes.bool,

  // Actions
  getDashboards: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.dashboards.loading,
  dashboards: getFilteredDashboards(state),
  error: state.dashboards.error
});

const mapDispatchToProps = {
  getDashboards,
  deleteDashboard,
  setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsList);
