import 'isomorphic-fetch';
import ResourcesService from 'services/ResourcesService';

/**
 * CONSTANTS
*/
const GET_RESOURCES_SUCCESS = 'resources/GET_RESOURCES_SUCCESS';
const GET_RESOURCES_ERROR = 'resources/GET_RESOURCES_ERROR';
const GET_RESOURCES_LOADING = 'resources/GET_RESOURCES_LOADING';
const SET_RESOURCES_FILTERS = 'resources/SET_RESOURCES_FILTERS';

/**
 * STORE
 * @property {string} resources.error
 * @property {{ key: string, value: string|number }[]} resources.filters
 */
const initialState = {
  resources: {
    list: [],       // Actual list of resources
    loading: false, // Are we loading the data?
    error: null,    // An error was produced while loading the data
    filters: []     // Filters for the list of resources
  }
};

const service = new ResourcesService();
/**
 * REDUCER
 * @export
 * @param {initialState} state
 * @param {{ type: string, payload: any }} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESOURCES_LOADING: {
      const resources = Object.assign({}, state.resources, {
        loading: true,
        error: null
      });
      return Object.assign({}, state, { resources });
    }

    case GET_RESOURCES_SUCCESS: {
      const resources = Object.assign({}, state.resources, {
        list: action.payload,
        loading: false,
        error: null
      });
      return Object.assign({}, state, { resources });
    }

    case GET_RESOURCES_ERROR: {
      const resources = Object.assign({}, state.resources, {
        loading: false,
        error: action.payload
      });
      return Object.assign({}, state, { resources });
    }

    case SET_RESOURCES_FILTERS: {
      const resources = Object.assign({}, state.resources, { filters: action.payload });
      return Object.assign({}, state, { resources });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 */

/**
 * Retrieve the list of resources
 * @export
 * @param {string[]} applications Name of the applications to load the resources from
 */
export function getResources() {
  return (dispatch) => {
    dispatch({ type: GET_RESOURCES_LOADING });

    service.fetchAllData()
      .then((data) => {
        dispatch({ type: GET_RESOURCES_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_RESOURCES_ERROR, payload: err.message });
      });
  };
}

/**
 * Set the filters for the list of resources
 * @export
 * @param {{ key: string, value: string|number }[]} filters List of filters
 */
export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_RESOURCES_FILTERS,
    payload: filters
  });
}
