import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { getCoreDatasets, setFilters } from 'redactions/admin/coredatasets';

// Selectors
import getFilteredCoreDatasets from 'selectors/admin/coredatasets';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';

// TDs
import TitleTD from './td/TitleTD';
import NumberDatasetsTD from './td/NumberDatasetsTD';
import PublishedTD from './td/PublishedTD';


class CoreDatasetsTable extends React.Component {
  componentDidMount() {
    this.props.setFilters([]);
    this.props.getCoreDatasets();
  }

  /**
   * Event handler executed when the user search for a dataset
   * @param {string} { value } Search keywords
   */
  @Autobind
  onSearch(value) {
    if (!value.length) {
      this.props.setFilters([]);
    } else {
      this.props.setFilters([{ key: 'title', value }]);
    }
  }

  /**
   * HELPERS
   * - getCoreDatasets
   * - getFilteredCoreDatasets
  */
  getCoreDatasets() {
    return this.props.coreDatasets;
  }

  getFilteredCoreDatasets() {
    return this.props.filteredCoreDatasets;
  }

  render() {
    return (
      <div className="c-resources-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search core datasets'
          }}
          link={{
            label: 'Add core dataset',
            route: 'admin_core_datasets_detail',
            params: { tab: 'core-datasets', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'title', td: TitleTD },
              { label: 'ISO', value: 'country_iso' },
              { label: 'Subcategory', value: 'subcategory' },
              { label: 'Nº of datasets', value: 'dataset_ids', td: NumberDatasetsTD },
              { label: 'Published', value: 'published', td: PublishedTD }
            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_core_datasets_detail', params: { tab: 'core-datasets', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_core_datasets_detail', params: { tab: 'core-datasets', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={this.getFilteredCoreDatasets()}
            pageSize={20}
            pagination={{
              enabled: true,
              pageSize: 20,
              page: 0
            }}
            onToggleSelectedRow={(ids) => { console.info(ids); }}
            onRowDelete={(id) => { console.info(id); }}
          />
        )}
      </div>
    );
  }
}

CoreDatasetsTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  coreDatasets: [],
  filteredCoreDatasets: []
};

CoreDatasetsTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  coreDatasets: PropTypes.array.isRequired,
  filteredCoreDatasets: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getCoreDatasets: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.coreDatasets.loading,
  coreDatasets: state.coreDatasets.list,
  filteredCoreDatasets: getFilteredCoreDatasets(state),
  error: state.coreDatasets.error
});
const mapDispatchToProps = dispatch => ({
  getCoreDatasets: () => dispatch(getCoreDatasets()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreDatasetsTable);
