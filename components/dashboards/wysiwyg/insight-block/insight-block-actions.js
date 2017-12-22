import 'isomorphic-fetch';
import { createAction, createThunkAction } from 'redux-tools';

// Insight actions
export const setInsight = createAction('INSIGHT_BLOCK_GET');
export const setInsightLoading = createAction('INSIGHT_BLOCK_LOADING');
export const setInsightError = createAction('INSIGHT_BLOCK_ERROR');
export const setInsightModal = createAction('INSIGHT_BLOCK_MODAL');
export const removeInsight = createAction('INSIGHT_BLOCK_REMOVE');

// Async actions
export const fetchInsight = createThunkAction('INSIGHT_BLOCK_FETCH_DATA', (payload = {}) => (dispatch) => {
  const id = `${payload.id}/${payload.itemId}`;

  dispatch(setInsightLoading({ id, value: true }));
  dispatch(setInsightError({ id, value: null }));

  fetch(`${process.env.API_URL}/insights/${payload.id}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setInsightLoading({ id, value: false }));
      dispatch(setInsightError({ id, value: null }));
      dispatch(setInsight({ id, value: data }));
    })
    .catch((err) => {
      dispatch(setInsightLoading(false));
      dispatch(setInsightError(err));
    });
});
