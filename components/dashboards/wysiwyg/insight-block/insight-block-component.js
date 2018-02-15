import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';

import styles from './insight-block.scss';

export default function InsightBlock({
  data,
  item
}) {
  const id = `${item.content.insightId}/${item.id}`;

  if (!data[id]) {
    return null;
  }

  const {
    insight,
    insightLoading,
    insightError
  } = data[id];

  return (
    <div className="c-insight-block">
      <style jsx>
        {styles}
      </style>

      <Spinner isLoading={insightLoading} className="-light -small" />

      {!insightError &&
        <header>
          <div className="insight-header">
            <Title className="-default">
              {insight.content_url &&
                <a href={insight.content_url} target="_blank">{insight.title}</a>
              }
              {!insight.content_url &&
                insight.title
              }
            </Title>
          </div>
        </header>
      }

      {!insightError &&
        <div className="insight-container">
          <div className="summary">
            <p>{insight.summary}</p>
          </div>

          {insight.partner &&
            <div className="image">
              <img src={insight.partner.thumbnail} alt={insight.partner.name} />
            </div>
          }

          {insight.attribution &&
            <div className="attribution">
              {insight.attribution}
            </div>
          }
        </div>
      }

      {insightError &&
        <p>The insight cannot be displayed</p>
      }
    </div>
  );
}

InsightBlock.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object
};

InsightBlock.defaultProps = {
  data: {},
  item: {}
};
