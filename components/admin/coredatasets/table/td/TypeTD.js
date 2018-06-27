import React from 'react';
import PropTypes from 'prop-types';

function TypeTD(props) {
  const { value, index } = props;

  return (
    <td key={index}>
      <span >{value}</span>
    </td>
  );
}

TypeTD.propTypes = {
  value: PropTypes.string,
  index: PropTypes.string
};

export default TypeTD;
