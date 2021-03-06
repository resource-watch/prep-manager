import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as reducers from 'redactions';
import { reducers as widgetEditorModules } from 'widget-editor';

// New modules
import { handleModule } from 'redux-tools';
import * as dashboardDetail from 'components/dashboards/detail/dashboard-detail';
import * as dashboardThumbnailList from 'components/dashboards/thumbnail-list/dashboard-thumbnail-list';
import * as widgetBlockModule from 'components/dashboards/wysiwyg/widget-block/widget-block';
import * as widgetBlockEditionModule from 'components/dashboards/wysiwyg/widget-block-edition/widget-block-edition';
import * as toolBlockModule from 'components/dashboards/wysiwyg/tool-block/tool-block';
import * as toolBlockEditionModule from 'components/dashboards/wysiwyg/tool-block-edition/tool-block-edition';
import * as insightBlockModule from 'components/dashboards/wysiwyg/insight-block/insight-block';
import * as insightBlockEditionModule from 'components/dashboards/wysiwyg/insight-block-edition/insight-block-edition';
import * as ShareModalModule from 'components/share-modal';

// Widget
import * as widgetDetail from 'pages/app/widget-detail/widget-detail';

// REDUCERS
const reducer = combineReducers({
  ...reducers,
  ...widgetEditorModules,

  // Dashboards
  dashboardDetail: handleModule(dashboardDetail),
  dashboardThumbnailList: handleModule(dashboardThumbnailList),
  widgetBlock: handleModule(widgetBlockModule),
  widgetBlockEdition: handleModule(widgetBlockEditionModule),
  toolBlock: handleModule(toolBlockModule),
  toolBlockEdition: handleModule(toolBlockEditionModule),
  insightBlock: handleModule(insightBlockModule),
  insightBlockEdition: handleModule(insightBlockEditionModule),
  // shareModal: handleModule(ShareModalModule),
  // widgetDetail: handleModule(widgetDetail)
});
const composeEnhancers = composeWithDevTools({});

export const initStore = (initialState = {}) => createStore(
  reducer,
  initialState,
  composeEnhancers(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(thunk)
  )
);
