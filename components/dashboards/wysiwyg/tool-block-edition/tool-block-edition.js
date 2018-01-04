import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import * as actions from './tool-block-edition-actions';
import * as reducers from './tool-block-edition-reducers';
import initialState from './tool-block-edition-default-state';
import { getFilteredTools } from './tool-block-edition-selectors';

import ToolBlockEditionComponent from './tool-block-edition-component';

// Mandatory
export {
  actions, reducers, initialState
};

class ToolBlockEdition extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    // Redux
    setTools: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.triggerFetch(this.props);
  }

  componentWillUnmount() {
    // Reset page and search params
    this.props.setTools([]);
    this.props.setPage(1);
    this.props.setSearch('');
  }

  /**
   * HELPERS
   * - triggerFetch
  */
  triggerFetch = (props) => {
    props.fetchTools({
      filters: {
        ...props.data.tab === 'my-tools' && { userId: props.user.id },
        ...!!props.data.search && { name: props.data.search },
        'page[number]': props.data.page
      }
    });
  }

  render() {
    return createElement(ToolBlockEditionComponent, {
      onSelectTool: (tool) => {
        this.props.onSubmit({
          toolId: tool.id,
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
    data: state.toolBlockEdition,
    filteredTools: getFilteredTools(state.toolBlockEdition),
    user: state.user
  }),
  actions
)(ToolBlockEdition);
