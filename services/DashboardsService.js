import 'isomorphic-fetch';
import { get, post, remove } from 'utils/request';

import sortBy from 'lodash/sortBy';

export default class DashboardsService {
  constructor(options = {}) {
    this.opts = options;
  }

  // GET ALL DATA
  fetchAllData({ includes, filters, fields } = {}) {
    const qParams = {
      ...!!includes && { includes },
      ...filters,
      ...fields,
      env: process.env.API_ENV
    };
    const params = Object.keys(qParams).map(k => `${k}=${qParams[k]}`).join('&');

    return new Promise((resolve, reject) => {
      get({
        url: `${process.env.API_URL}/dashboards/?${params}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
        }],
        onSuccess: (response) => {
          resolve(sortBy(response, 'title'));
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }

  fetchData({ id }) {
    return new Promise((resolve, reject) => {
      get({
        url: `${process.env.API_URL}/dashboards/${id}?env=${process.env.API_ENV}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
        }],
        onSuccess: (response) => {
          resolve(response);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }

  saveData({ type, body, id }) {
    return new Promise((resolve, reject) => {
      post({
        url: `${process.env.API_URL}/dashboards/${id}`,
        type,
        body,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }, {
          key: 'Authorization',
          value: this.opts.authorization
        }],
        onSuccess: (response) => {
          resolve(response);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }

  deleteData({ id, auth }) {
    return new Promise((resolve, reject) => {
      remove({
        url: `${process.env.API_URL}/dashboards/${id}`,
        headers: [{
          key: 'Authorization',
          value: auth || this.opts.authorization
        }],
        onSuccess: (response) => {
          resolve(response);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }
}
