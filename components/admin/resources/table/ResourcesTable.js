import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { getResources, setFilters } from 'redactions/admin/resources';

// Selectors
import getFilteredResources from 'selectors/admin/resources';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// Table components
import EditAction from './actions/EditAction';
import DeleteAction from './actions/DeleteAction';

// TDs
import TitleTD from './td/TitleTD';
import TypeTD from './td/TypeTD';
import PublishedTD from './td/PublishedTD';


class ResourcesTable extends React.Component {
  componentDidMount() {
    this.props.setFilters([]);
    this.props.getResources();
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
   * - getResources
   * - getFilteredResources
  */
  getResources() {
    return this.props.resources;
  }

  getFilteredResources() {
    return this.props.filteredResources;
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
            placeholder: 'Search resources'
          }}
          link={{
            label: 'New resource',
            route: 'admin_resources_detail',
            params: { tab: 'resources', id: 'new' }
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Title', value: 'title', td: TitleTD },
              { label: 'Type', value: 'resource_type', td: TypeTD },
              { label: 'Published', value: 'published', td: PublishedTD }

            ]}
            actions={{
              show: true,
              list: [
                { name: 'Edit', route: 'admin_resources_detail', params: { tab: 'resources', subtab: 'edit', id: '{{id}}' }, show: true, component: EditAction },
                { name: 'Remove', route: 'admin_resources_detail', params: { tab: 'resources', subtab: 'remove', id: '{{id}}' }, component: DeleteAction, componentProps: { authorization: this.props.authorization } }
              ]
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={this.getFilteredResources()}
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

ResourcesTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  resources: [],
  filteredResources: []
};

ResourcesTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  resources: PropTypes.array.isRequired,
  filteredResources: PropTypes.array.isRequired,
  error: PropTypes.string,

  // Actions
  getResources: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.resources.resources.loading,
  resources: state.resources.resources.list,
  filteredResources: getFilteredResources(state),
  error: state.resources.resources.error
});
const mapDispatchToProps = dispatch => ({
  getResources: () => dispatch(getResources()),
  setFilters: filters => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesTable);
