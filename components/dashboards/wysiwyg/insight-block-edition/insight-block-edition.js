import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import * as actions from './insight-block-edition-actions';
import reducers from './insight-block-edition-reducers';
import initialState from './insight-block-edition-default-state';
import { getFilteredInsights } from './insight-block-edition-selectors';

import InsightBlockEditionComponent from './insight-block-edition-component';

// Mandatory
export {
  actions, reducers, initialState
};

class InsightBlockEdition extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    // Redux
    setInsights: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.triggerFetch(this.props);
  }

  componentWillUnmount() {
    // Reset page and search params
    this.props.setInsights([]);
    this.props.setPage(1);
    this.props.setSearch('');
  }

  /**
   * HELPERS
   * - triggerFetch
  */
  triggerFetch = (props) => {
    props.fetchInsights({
      filters: {
        ...props.data.tab === 'my-insights' && { userId: props.user.id },
        ...!!props.data.search && { name: props.data.search },
        'page[number]': props.data.page
      }
    });
  }

  render() {
    return createElement(InsightBlockEditionComponent, {
      onSelectInsight: (insight) => {
        this.props.onSubmit({
          insightId: insight.id,
          categories: []
        });
      },
      onChangePage: (page) => {
        this.props.setPage(page);
      },
      onChangeSearch: debounce((search) => {
        this.props.setPage(1);
        this.props.setSearch(search);
      }, 250),
      ...this.props
    });
  }
}
export default connect(
  state => ({
    data: state.insightBlockEdition,
    filteredInsights: getFilteredInsights(state.insightBlockEdition),
    user: state.user
  }),
  actions
)(InsightBlockEdition);
