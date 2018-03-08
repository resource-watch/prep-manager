// Redux
import { connect } from 'react-redux';
import * as actions from './widget-detail-actions';
import * as reducers from './widget-detail-reducers';
import initialState from './widget-detail-default-state';

import WidgetDetailComponent from './widget-detail-component';

// actions
import { setOpen, setLinks } from 'components/share-modal/share-modal-actions';

const mapDispatchToProps = {
  setOpen,
  setLinks
};

// Mandatory
export {
  actions, reducers, initialState
};

export default connect(
  state => ({
    // Store
    widgetDetail: state.widgetDetail,
    user: state.user
  }),
  {
    ...actions,
    ...mapDispatchToProps,
  }
)(WidgetDetailComponent);
