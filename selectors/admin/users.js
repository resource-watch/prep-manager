import { createSelector } from 'reselect';

const users = state => state.users.list;
const filters = state => state.users.filters;

/**
 * Return the users that comply with the filters
 * @param {object[]} users Datasets to filter
 * @param {{ key: string, value: string|number }[]} filters Filters to apply to the users
 */
const getFilteredUsers = (users, filters) => { // eslint-disable-line no-shadow
  if (!filters.length) return users;

  return users.filter((user) => { // eslint-disable-line arrow-body-style
    return filters.every((filter) => {
      if (filter.key === 'id') return user._id === filter.value;
      if (!user[filter.key]) return false;

      if (typeof filter.value === 'string') {
        return user[filter.key].toLowerCase().match(filter.value.toLowerCase());
      }

      return user[filter.key] === filter.value;
    });
  });
};

export default createSelector(users, filters, getFilteredUsers);
