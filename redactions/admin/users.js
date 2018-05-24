/* global config */
import 'isomorphic-fetch';
import UsersService from 'services/UsersService';

const service = new UsersService({ apiURL: process.env.CONTROL_TOWER_URL });

/**
 * CONSTANTS
*/
const GET_USERS_SUCCESS = 'admin/GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'admin/GET_USERS_ERROR';
const GET_USERS_LOADING = 'admin/GET_USERS_LOADING';
const SET_USERS_FILTERS = 'dashboards/SET_USERS_FILTERS';

/**
 * STORE
 * @property {string} users.error
 */
const initialState = {
  list: [], // Actual list of users
  loading: false, // Are we loading the data?
  error: null, // An error was produced while loading the data
  filters: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload,
        loading: false,
        error: null
      });
    }

    case GET_USERS_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    }

    case GET_USERS_LOADING: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }

    case SET_USERS_FILTERS: {
      return Object.assign({}, state, { filters: action.payload });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getUsers
 * Retrieve the list of users
 * @export
 * @param {string[]} applications Name of the applications to load the users from
 */
export function getUsers(options) {
  return (dispatch) => {
    dispatch({ type: GET_USERS_LOADING });

    return service.fetchAllUsers(options)
      .then((data) => {
        dispatch({ type: GET_USERS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_USERS_ERROR, payload: err.message });
      });
  };
}

export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_USERS_FILTERS,
    payload: filters
  });
}
