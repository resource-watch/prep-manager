import * as actions from './tool-block-actions';

const defaultTool = {
  tool: {},
  toolLoading: false,
  toolError: null,
  toolModal: false
};


export default {
  [actions.setTool]: (state, action) => {
    if (!action.payload.id) return state;

    const tool = {
      ...defaultTool,
      ...state[action.payload.id],
      tool: action.payload.value
    };
    return { ...state, [action.payload.id]: tool };
  },

  [actions.setToolLoading]: (state, action) => {
    if (!action.payload.id) return state;

    const tool = {
      ...defaultTool,
      ...state[action.payload.id],
      toolLoading: action.payload.value
    };
    return { ...state, [action.payload.id]: tool };
  },

  [actions.setToolError]: (state, action) => {
    if (!action.payload.id) return state;

    const tool = {
      ...defaultTool,
      ...state[action.payload.id],
      toolError: action.payload.value
    };
    return { ...state, [action.payload.id]: tool };
  },

  [actions.setToolModal]: (state, action) => {
    if (!action.payload.id) return state;

    const tool = {
      ...defaultTool,
      ...state[action.payload.id],
      toolModal: action.payload.value
    };
    return { ...state, [action.payload.id]: tool };
  },

  [actions.removeTool]: (state, action) => {
    if (!action.payload.id) return state;

    delete state[action.payload.id];
    return state;
  }
};
