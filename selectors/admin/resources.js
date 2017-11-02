import { createSelector } from 'reselect';

const resources = state => state.resources.resources.list;
const filters = state => state.resources.resources.filters;

/**
 * Return the resources that comply with the filters
 * @param {object[]} resources Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the resources
 */
const getFilteredResources = (resources, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return resources;

  return resources.filter((resource) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return resource.id === filter.value;
      if (!resource[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return resource[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return resource[filter.key] === filter.value;
    });
  });
};

export default createSelector(resources, filters, getFilteredResources);
