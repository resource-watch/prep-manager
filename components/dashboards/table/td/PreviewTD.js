import React from 'react';
import PropTypes from 'prop-types';

function PreviewTD(props) {
  const { value, index } = props;

  return (
    <td key={index}>
      <a target="_blank" href={`/dashboards/${value}`}>
        {`${window.location.origin}/dashboards/${value}`}
      </a>
    </td>
  );
}

PreviewTD.propTypes = {
  value: PropTypes.string,
  index: PropTypes.string
};

export default PreviewTD;
