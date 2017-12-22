import * as actions from './insight-block-actions';

const defaultInsight = {
  insight: {},
  insightLoading: false,
  insightError: null,
  insightModal: false
};


export default {
  [actions.setInsight]: (state, action) => {
    if (!action.payload.id) return state;

    const insight = {
      ...defaultInsight,
      ...state[action.payload.id],
      insight: action.payload.value
    };
    return { ...state, [action.payload.id]: insight };
  },

  [actions.setInsightLoading]: (state, action) => {
    if (!action.payload.id) return state;

    const insight = {
      ...defaultInsight,
      ...state[action.payload.id],
      insightLoading: action.payload.value
    };
    return { ...state, [action.payload.id]: insight };
  },

  [actions.setInsightError]: (state, action) => {
    if (!action.payload.id) return state;

    const insight = {
      ...defaultInsight,
      ...state[action.payload.id],
      insightError: action.payload.value
    };
    return { ...state, [action.payload.id]: insight };
  },

  [actions.setInsightModal]: (state, action) => {
    if (!action.payload.id) return state;

    const insight = {
      ...defaultInsight,
      ...state[action.payload.id],
      insightModal: action.payload.value
    };
    return { ...state, [action.payload.id]: insight };
  },

  [actions.removeInsight]: (state, action) => {
    if (!action.payload.id) return state;

    delete state[action.payload.id];
    return state;
  }
};
