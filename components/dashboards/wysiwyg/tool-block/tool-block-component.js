import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';

import styles from './tool-block.scss';

export default function ToolBlock({
  data,
  item
}) {
  const id = `${item.content.toolId}/${item.id}`;

  if (!data[id]) {
    return null;
  }

  const {
    tool,
    toolLoading,
    toolError
  } = data[id];

  return (
    <div className="c-tool-block">
      <style jsx>
        {styles}
      </style>

      <Spinner isLoading={toolLoading} className="-light -small" />

      {!toolError &&
        <header>
          <div className="tool-header">
            <Title className="-default">
              {tool.url &&
                <a href={tool.url} target="_blank">{tool.title}</a>
              }
              {!tool.url &&
                tool.title
              }
            </Title>
          </div>
        </header>
      }

      {!toolError &&
        <div className="tool-container">
          <div className="summary">
            <p>{tool.summary}</p>
          </div>

          {tool.partner &&
            <div className="image">
              <img src={tool.partner.images.thumbnail} alt={tool.partner.name} />
            </div>
          }

          {tool.attribution &&
            <div className="attribution">
              {tool.attribution}
            </div>
          }
        </div>
      }

      {toolError &&
        <p>The tool cannot be displayed</p>
      }
    </div>
  );
}

ToolBlock.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object
};

ToolBlock.defaultProps = {
  data: {},
  item: {}
};
