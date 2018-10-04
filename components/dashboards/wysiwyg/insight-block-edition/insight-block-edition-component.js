import React from 'react';
import PropTypes from 'prop-types';

// Components
import Spinner from 'components/ui/Spinner';
import Paginator from 'components/ui/Paginator';
import SearchInput from 'components/ui/SearchInput';

import styles from './insight-block-edition.scss';

export default function InsightBlockEdition({ data, filteredInsights, onSelectInsight, onChangePage, onChangeSearch }) {
  return (
    <div className="c-insight-block-edition">
      <style jsx>
        {`${styles}`}
      </style>

      <div className="l-page">
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">
                <div className="page-header-content">
                  <h1>Select insight</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="c-page-section -small dock-insight-container">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">

                <SearchInput
                  input={{
                    placeholder: 'Search insight'
                  }}
                  link={{}}
                  onSearch={onChangeSearch}
                />

                <Spinner isLoading={data.loading} className="-relative -small -light" />

                {!data.loading && !data.insights.length &&
                  <p>You have not created any insight yet</p>
                }

                <ul className="insight-block-list">
                  {filteredInsights
                    .slice((data.page - 1) * data.pageSize, data.page * data.pageSize)
                    .map(t => (
                      <li
                        key={t.id}
                        onClick={() => onSelectInsight(t)}
                      >
                        {t.title}
                      </li>
                    ))
                  }
                </ul>

                {/* <InsightList
                  insights={data.insights}
                  mode="grid"
                  onInsightClick={onSelectInsight}
                /> */}

                <Spinner isLoading={data.loading} className="-relative -small -light" />

                <Paginator
                  options={{
                    size: filteredInsights.length,
                    page: data.page,
                    limit: data.pageSize
                  }}
                  onChange={onChangePage}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

InsightBlockEdition.propTypes = {
  data: PropTypes.object,
  filteredInsights: PropTypes.array,
  paginatedInsights: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onSelectInsight: PropTypes.func
};

InsightBlockEdition.defaultProps = {
  data: {},
  filteredInsights: [],
  paginatedInsights: [],
  onChangePage: null,
  onChangeSearch: null,
  onSelectInsight: null
};
