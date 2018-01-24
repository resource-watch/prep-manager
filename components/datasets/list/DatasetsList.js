import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getDatasets, setFilters } from 'redactions/admin/datasets';
import { toggleFavourite } from 'redactions/user';

// Selectors
import getFilteredDatasets from 'selectors/admin/datasets';

// Components
import Spinner from 'components/ui/Spinner';
import SearchInput from 'components/ui/SearchInput';
import DatasetsListCard from 'components/datasets/list/DatasetsListCard';

class DatasetsList extends React.Component {
  componentDidMount() {
    this.loadData();
  }

  onSearch = (value) => {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'name', value }]);
    }
  }

  handleDatasetRemoved = () => this.loadData();

  loadData() {
    const { getDatasetsFilters } = this.props;

    this.props.setFilters([]);
    this.props.getDatasets({
      includes: 'widget,layer,metadata,vocabulary',
      filters: getDatasetsFilters
    });
  }

  render() {
    const { datasets, routes, user, loading, toggleFavourites } = this.props;

    return (
      <div className="c-dataset-list">
        <Spinner className="-light" isLoading={loading} />

        <SearchInput
          input={{
            placeholder: 'Search dataset'
          }}
          link={{
            label: 'New dataset',
            route: routes.detail,
            params: { tab: 'datasets', id: 'new' }
          }}
          buttonClass="-app"
          onSearch={this.onSearch}
        />

        <div className="l-row row list">
          {datasets.map(dataset => (
            <div
              className="column list-item small-12 medium-4"
              key={dataset.id}
            >
              <DatasetsListCard
                dataset={dataset}
                routes={routes}
                user={user}
                onDatasetRemoved={this.handleDatasetRemoved}
                toggleFavourites={toggleFavourites}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DatasetsList.defaultProps = {
  routes: {
    index: '',
    detail: ''
  },
  getDatasetsFilters: {},
  // Store
  datasets: [],
  // actions
  toggleFavourites: () => {}
};

DatasetsList.propTypes = {
  routes: PropTypes.object,
  getDatasetsFilters: PropTypes.object,

  // Store
  user: PropTypes.object,
  datasets: PropTypes.array.isRequired,
  loading: PropTypes.bool,

  // Actions
  getDatasets: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  toggleFavourites: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.datasets.datasets.loading,
  favouriteLoading: state.user.favourites.loading,
  datasets: getFilteredDatasets(state),
  error: state.datasets.datasets.error
});

const mapDispatchToProps = dispatch => ({
  getDatasets: options => dispatch(getDatasets(options)),
  setFilters: filters => dispatch(setFilters(filters)),
  toggleFavourites: (favourite, resource) =>
    dispatch(toggleFavourite(favourite, resource))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetsList);
