import initOpbeat from 'opbeat-react';
import { createOpbeatMiddleware } from 'opbeat-react/redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as reducers from 'redactions';
import { setConfig, reducers as widgetEditorModules } from 'widget-editor';

if (process.env.NODE_ENV === 'production') {
  initOpbeat({
    orgId: '17ab8eb501d2418a81f3167c10407e90',
    appId: '7170680c2a'
  });
}

// REDUCERS
const reducer = combineReducers({
  ...reducers,
  ...widgetEditorModules
});
const composeEnhancers = composeWithDevTools({});

export const initStore = (initialState = {}) => createStore(
  reducer,
  initialState,
  composeEnhancers(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(thunk, createOpbeatMiddleware())
  )
);
