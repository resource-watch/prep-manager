import * as actions from './insight-block-edition-actions';

export default {
  [actions.setInsights]: (state, action) =>
    ({ ...state, insights: action.payload }),

  [actions.setLoading]: (state, action) =>
    ({ ...state, loading: action.payload }),

  [actions.setError]: (state, action) =>
    ({ ...state, error: action.payload }),

  [actions.setPage]: (state, action) =>
    ({ ...state, page: action.payload }),

  [actions.setPageSize]: (state, action) =>
    ({ ...state, pageSize: action.payload }),

  [actions.setTotal]: (state, action) =>
    ({ ...state, total: action.payload }),

  [actions.setSearch]: (state, action) =>
    ({ ...state, search: action.payload })


};
