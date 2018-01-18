export const belongsToACollection = (user = {}, resourcToCheck = {}) => {
  const { favourites, collections } = user;

  const containedInFavorites = favourites.items.some(fav =>
    fav.attributes.resourceId === resourcToCheck.id);
  const containedInCollections = collections.items.some(collection =>
    collection.attributes.resources.some(resource => resource.id === resourcToCheck.id));

  return containedInFavorites || containedInCollections;
};

export default {
  belongsToACollection
};
