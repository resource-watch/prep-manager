import 'isomorphic-fetch';
import { createAction, createThunkAction } from 'redux-tools';

// Tool actions
export const setTool = createAction('TOOL_BLOCK_GET');
export const setToolLoading = createAction('TOOL_BLOCK_LOADING');
export const setToolError = createAction('TOOL_BLOCK_ERROR');
export const setToolModal = createAction('TOOL_BLOCK_MODAL');
export const removeTool = createAction('TOOL_BLOCK_REMOVE');

// Async actions
export const fetchTool = createThunkAction('TOOL_BLOCK_FETCH_DATA', (payload = {}) => (dispatch) => {
  const id = `${payload.id}/${payload.itemId}`;

  dispatch(setToolLoading({ id, value: true }));
  dispatch(setToolError({ id, value: null }));

  fetch(`${process.env.API_URL}/tools/${payload.id}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setToolLoading({ id, value: false }));
      dispatch(setToolError({ id, value: null }));
      dispatch(setTool({ id, value: data }));
    })
    .catch((err) => {
      dispatch(setToolLoading(false));
      dispatch(setToolError(err));
    });
});
