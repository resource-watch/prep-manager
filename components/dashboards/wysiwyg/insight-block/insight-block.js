import React, { createElement } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from './insight-block-actions';
import * as reducers from './insight-block-reducers';
import initialState from './insight-block-default-state';

import InsightBlockComponent from './insight-block-component';

// Mandatory
export {
  actions, reducers, initialState
};

class InsightBlock extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,

    // Redux
    setInsightLoading: PropTypes.func.isRequired,
    setInsightModal: PropTypes.func.isRequired,
    removeInsight: PropTypes.func.isRequired
  };

  async componentWillMount() {
    if (this.props.item.content.insightId) {
      await this.triggerFetch(this.props);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.item.content.insightId !== this.props.item.content.insightId) {
      await this.triggerFetch(nextProps);
    }
  }

  componentWillUnmount() {
    const { item } = this.props;
    // Reset insight
    this.props.removeInsight({
      id: `${item.content.insightId}/${item.id}`
    });
  }

  /**
   * HELPERS
   * - triggerFetch
  */

  triggerFetch = props => props.fetchInsight({
    id: props.item.content.insightId,
    itemId: props.item.id
  })

  render() {
    return createElement(InsightBlockComponent, {
      onToggleModal: (modal) => {
        const { item } = this.props;

        this.props.setInsightModal({
          id: `${item.content.insightId}/${item.id}`,
          value: modal
        });
      },
      onToggleLoading: (loading) => {
        const { item } = this.props;

        this.props.setInsightLoading({
          id: `${item.content.insightId}/${item.id}`,
          value: loading
        });
      },
      ...this.props
    });
  }
}
export default connect(
  state => ({
    data: state.insightBlock,
    user: state.user
  }),
  actions
)(InsightBlock);
