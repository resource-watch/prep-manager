import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { setFilters, setPaginationPage, setOrderDirection, getDatasetsByTab } from 'redactions/admin/datasets';

import MyPREPDatasetsMy from './my-prep-datasets-component';

class MyPREPDatasetsMyContainer extends PureComponent {
  static propTypes = {
    subtab: PropTypes.string,
    setFilters: PropTypes.func,
    setPaginationPage: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    const { subtab } = this.props;

    if (subtab !== nextProps.subtab) {
      this.props.setFilters([]);
      this.props.setPaginationPage(1);
    }
  }

  render() {
    return (<MyPREPDatasetsMy {...this.props} />);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  subtab: state.routes.query.subtab,
  orderDirection: state.datasets.datasets.orderDirection,
  filters: state.datasets.datasets.filters,
  pagination: state.datasets.datasets.pagination,
  routes: state.routes
});

const mapDispatchToProps = {
  setFilters,
  setPaginationPage,
  setOrderDirection,
  getDatasetsByTab
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPREPDatasetsMyContainer);
