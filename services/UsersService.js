import 'isomorphic-fetch';
import Promise from 'bluebird';

export default class UsersService {
  constructor(options) {
    if (!options) {
      throw new Error('options params is required.');
    }
    if (!options.apiURL || options.apiURL === '') {
      throw new Error('options.apiURL param is required.');
    }
    this.opts = options;
  }

  /**
   * Gets the user that is currently logged
   * @returns {Promise}
   */
  fetchAllUsers({ token }) {
    return new Promise((resolve) => {
      fetch(`${this.opts.apiURL}/auth/user?app=prep`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then(response => resolve(response.json()));
    });
  }
}
