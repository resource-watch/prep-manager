import { createSelector } from 'reselect';

const coreDatasets = state => state.coreDatasets.list;
const filters = state => state.coreDatasets.filters;

/**
 * Return the resources that comply with the filters
 * @param {object[]} resources Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the resources
 */
const getFilteredCoreDatasets = (coreDatasets, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return coreDatasets;

  return coreDatasets.filter((coreDataset) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return coreDataset.id === filter.value;
      if (!coreDataset[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return coreDataset[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return coreDataset[filter.key] === filter.value;
    });
  });
};

export default createSelector(coreDatasets, filters, getFilteredCoreDatasets);
