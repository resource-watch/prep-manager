import 'isomorphic-fetch';
import CoreDatasetsService from 'services/CoreDatasetsService';

/**
 * CONSTANTS
*/
const GET_CORE_DATASETS_SUCCESS = 'coredatasets/GET_CORE_DATASETS_SUCCESS';
const GET_CORE_DATASETS_ERROR = 'coredatasets/GET_CORE_DATASETS_ERROR';
const GET_CORE_DATASETS_LOADING = 'coredatasets/GET_CORE_DATASETS_LOADING';
const SET_CORE_DATASETS_FILTERS = 'coredatasets/SET_CORE_DATASETS_FILTERS';

/**
 * STORE
 * @property {string} coreDatasets.error
 * @property {{ key: string, value: string|number }[]} coreDatasets.filters
 */
const initialState = {
  list: [],       // Actual list of coreDatasets
  loading: false, // Are we loading the data?
  error: null,    // An error was produced while loading the data
  filters: []     // Filters for the list of coreDatasets
};

const service = new CoreDatasetsService();
/**
 * REDUCER
 * @export
 * @param {initialState} state
 * @param {{ type: string, payload: any }} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CORE_DATASETS_LOADING: {
      const coreDatasets = Object.assign({}, state, {
        loading: true,
        error: null
      });
      return Object.assign({}, state, coreDatasets);
    }

    case GET_CORE_DATASETS_SUCCESS: {
      const coreDatasets = Object.assign({}, state, {
        list: action.payload,
        loading: false,
        error: null
      });
      return Object.assign({}, state, coreDatasets);
    }

    case GET_CORE_DATASETS_ERROR: {
      const coreDatasets = Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
      return Object.assign({}, state, coreDatasets);
    }

    case SET_CORE_DATASETS_FILTERS: {
      const coreDatasets = Object.assign({}, state, { filters: action.payload });
      return Object.assign({}, state, coreDatasets);
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 */

/**
 * Retrieve the list of core datasets
 * @export
 * @param {string[]} applications Name of the applications to load the core datasets from
 */
export function getCoreDatasets() {
  return (dispatch) => {
    dispatch({ type: GET_CORE_DATASETS_LOADING });

    service.fetchAllData()
      .then((data) => {
        dispatch({ type: GET_CORE_DATASETS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_CORE_DATASETS_ERROR, payload: err.message });
      });
  };
}

/**
 * Set the filters for the list of core datasets
 * @export
 * @param {{ key: string, value: string|number }[]} filters List of filters
 */
export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_CORE_DATASETS_FILTERS,
    payload: filters
  });
}
