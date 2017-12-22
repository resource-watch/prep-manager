import { createSelector } from 'reselect';

const getInsights = state => state.insights;
const getSearch = state => state.search;

export const getFilteredInsights = createSelector(
  [getInsights, getSearch],
  (insights, search) => {
    if (!search.length) return insights;

    return insights.filter((insight) => { // eslint-disable-line arrow-body-style
      return insight.title.toLowerCase().match(search.toLowerCase());
    });
  }
);

export default {
  getFilteredInsights
};
