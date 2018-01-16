import 'isomorphic-fetch';
import sortBy from 'lodash/sortBy';
import queryString from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';

// Actions
export const setInsights = createAction('INSIGHT_BLOCK_EDITION_LIST');
export const setLoading = createAction('INSIGHT_BLOCK_EDITION_LOADING');
export const setError = createAction('INSIGHT_BLOCK_EDITION_ERROR');
export const setPage = createAction('INSIGHT_BLOCK_EDITION_PAGE');
export const setPageSize = createAction('INSIGHT_BLOCK_EDITION_PAGE_SIZE');
export const setTotal = createAction('INSIGHT_BLOCK_EDITION_TOTAL');
export const setSearch = createAction('INSIGHT_BLOCK_EDITION_SEARCH');


// Async actions
export const fetchInsights = createThunkAction('INSIGHT_BLOCK_EDITION_FETCH_DATA', (payload = {}) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const qParams = queryString.stringify({
    sort: 'name',
    published: 'all',
    'page[number]': 1,
    'page[size]': 9,
    ...payload.filters
  });

  fetch(`${process.env.API_URL}/insights?${qParams}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setLoading(false));
      dispatch(setError(null));
      dispatch(setInsights(sortBy(data, 'title')));
      // dispatch(setTotal(meta['total-items']));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      dispatch(setError(err));
    });
});
