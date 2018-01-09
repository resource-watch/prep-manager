import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from './tool-block-actions';
import * as reducers from './tool-block-reducers';
import initialState from './tool-block-default-state';

import ToolBlockComponent from './tool-block-component';

// Mandatory
export {
  actions, reducers, initialState
};

class ToolBlock extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,

    // Redux
    setToolLoading: PropTypes.func.isRequired,
    setToolModal: PropTypes.func.isRequired,
    removeTool: PropTypes.func.isRequired
  };

  async componentWillMount() {
    if (this.props.item.content.toolId) {
      await this.triggerFetch(this.props);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.item.content.toolId !== this.props.item.content.toolId) {
      await this.triggerFetch(nextProps);
    }
  }

  componentWillUnmount() {
    const { item } = this.props;
    // Reset tool
    this.props.removeTool({
      id: `${item.content.toolId}/${item.id}`
    });
  }

  /**
   * HELPERS
   * - triggerFetch
  */

  triggerFetch = props => props.fetchTool({
    id: props.item.content.toolId,
    itemId: props.item.id
  })

  render() {
    return createElement(ToolBlockComponent, {
      onToggleModal: (modal) => {
        const { item } = this.props;

        this.props.setToolModal({
          id: `${item.content.toolId}/${item.id}`,
          value: modal
        });
      },
      onToggleLoading: (loading) => {
        const { item } = this.props;

        this.props.setToolLoading({
          id: `${item.content.toolId}/${item.id}`,
          value: loading
        });
      },
      ...this.props
    });
  }
}
export default connect(
  state => ({
    data: state.toolBlock,
    user: state.user
  }),
  actions
)(ToolBlock);
