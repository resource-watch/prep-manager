import { createSelector } from 'reselect';

const getDatasets = state => state.datasets.items || [];
const getFavourites = state => state.user.favourites.items;

export const getStarredDatasets = createSelector(
  [getDatasets, getFavourites],
  (datasets, favourites) => {
    const starredDatasetsIds = favourites.map(fav => fav.attributes.resourceId);

    return datasets.filter(dataset => starredDatasetsIds.includes(dataset.id));
  });

export default { getStarredDatasets };
