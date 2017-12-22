import { createSelector } from 'reselect';

const getTools = state => state.tools;
const getSearch = state => state.search;

export const getFilteredTools = createSelector(
  [getTools, getSearch],
  (tools, search) => {
    if (!search.length) return tools;

    return tools.filter((tool) => { // eslint-disable-line arrow-body-style
      return tool.title.toLowerCase().match(search.toLowerCase());
    });
  }
);

export default {
  getFilteredTools
};
