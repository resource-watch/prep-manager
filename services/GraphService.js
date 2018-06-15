import 'isomorphic-fetch';

export default class GraphService {
  constructor(options) {
    if (!options) throw new Error('options params is required.');
    if (!options.apiURL || options.apiURL === '') throw new Error('options.apiURL param is required.');
    this.opts = options;
  }

  /**
   * Get all tags
   */
  getAllTags() {
    return fetch(`${this.opts.apiURL}/graph/query/list-concepts?application=${process.env.APPLICATIONS}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => response.data);
  }
  /**
   * Get inferred tags
   */
  getInferredTags(tags) {
    return fetch(`${this.opts.apiURL}/graph/query/concepts-inferred?concepts=${tags}&application=${process.env.APPLICATIONS}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => response.data);
  }

  /**
  * Get dataset tags
  */
  getDatasetTags(datasetId) {
    return fetch(`${this.opts.apiURL}/dataset/${datasetId}/vocabulary?application=${process.env.APPLICATIONS}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => response.data);
  }

  /**
  * Update dataset tags
  */
  updateDatasetTags(datasetId, tags, token, type = 'POST') {
    if (type === 'POST') {
      const bodyObj = {
        knowledge_graph: {
          application: process.env.APPLICATIONS,
          tags
        }
      };

      return fetch(`${this.opts.apiURL}/dataset/${datasetId}/vocabulary`, {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then(jsonData => jsonData.data);
    }

    if (type === 'PATCH') {
      const bodyObj = {
        application: process.env.APPLICATIONS,
        tags
      };

      return fetch(`${this.opts.apiURL}/dataset/${datasetId}/vocabulary/knowledge_graph`, {
        method: 'PATCH',
        body: JSON.stringify(bodyObj),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then(jsonData => jsonData.data);
    }

    return null;
  }
}
