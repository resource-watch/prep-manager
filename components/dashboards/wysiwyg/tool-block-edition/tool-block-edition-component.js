import React from 'react';
import PropTypes from 'prop-types';

// Components
import Spinner from 'components/ui/Spinner';
import Paginator from 'components/ui/Paginator';
import SearchInput from 'components/ui/SearchInput';

import styles from './tool-block-edition.scss';

export default function ToolBlockEdition({ data, filteredTools, onSelectTool, onChangePage, onChangeSearch }) {
  return (
    <div className="c-tool-block-edition">
      <style jsx>
        {styles}
      </style>

      <div className="l-page">
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">
                <div className="page-header-content">
                  <h1>Select tool</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="c-page-section -small dock-tool-container">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">

                <SearchInput
                  input={{
                    placeholder: 'Search tool'
                  }}
                  link={{}}
                  onSearch={onChangeSearch}
                />

                <Spinner isLoading={data.loading} className="-relative -small -light" />

                {!data.loading && !data.tools.length &&
                  <p>You have not created any tool yet</p>
                }

                <ul className="tool-block-list">
                  {filteredTools
                    .slice((data.page - 1) * data.pageSize, data.page * data.pageSize)
                    .map(t => (
                      <li
                        key={t.id}
                        onClick={() => onSelectTool(t)}
                      >
                        {t.title}
                      </li>
                    ))
                  }
                </ul>

                {/* <ToolList
                  tools={data.tools}
                  mode="grid"
                  onToolClick={onSelectTool}
                /> */}

                <Spinner isLoading={data.loading} className="-relative -small -light" />

                <Paginator
                  options={{
                    size: filteredTools.length,
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

ToolBlockEdition.propTypes = {
  data: PropTypes.object,
  filteredTools: PropTypes.array,
  paginatedTools: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onSelectTool: PropTypes.func
};

ToolBlockEdition.defaultProps = {
  data: {},
  filteredTools: [],
  paginatedTools: [],
  onChangePage: null,
  onChangeSearch: null,
  onSelectTool: null
};
