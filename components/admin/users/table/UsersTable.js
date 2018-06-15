import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { getUsers, setFilters } from 'redactions/admin/users';

// Selectors
import getFilteredUsers from 'selectors/admin/users';

// Components
import Spinner from 'components/ui/Spinner';
import CustomTable from 'components/ui/customtable/CustomTable';
import SearchInput from 'components/ui/SearchInput';

// TDs
import TitleTD from './td/TitleTD';
import PublishedTD from './td/PublishedTD';

class UsersTable extends React.Component {
  componentDidMount() {
    this.props.setFilters([]);
    this.props.getUsers({ token: this.props.authorization });
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
      this.props.setFilters([{ key: 'name', value }]);
    }
  }

  render() {
    const users = this.props.users || [];

    return (
      <div className="c-tools-table">
        <Spinner className="-light" isLoading={this.props.loading} />

        {this.props.error && (
          <p>Error: {this.props.error}</p>
        )}

        <SearchInput
          input={{
            placeholder: 'Search tool'
          }}
          onSearch={this.onSearch}
        />

        {!this.props.error && (
          <CustomTable
            columns={[
              { label: 'Email', value: 'email', td: TitleTD },
              { label: 'Name', value: 'name' },
              { label: 'Provider', value: 'provider' },
              { label: 'Role', value: 'role' }
            ]}
            actions={{
              show: false,
              list: []
            }}
            sort={{
              field: 'title',
              value: 1
            }}
            filters={false}
            data={users}
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

UsersTable.defaultProps = {
  columns: [],
  actions: {},
  // Store
  users: []
};

UsersTable.propTypes = {
  authorization: PropTypes.string,
  // Store
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.string,
  // Actions
  getUsers: PropTypes.func.isRequired,
  setFilters: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.users.loading,
  users: getFilteredUsers(state),
  error: state.users.error,
  filters: state.users.filters
});

const mapDispatchToProps = dispatch => ({
  getUsers: (options) => dispatch(getUsers(options)),
  setFilters: (filters) => dispatch(setFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
