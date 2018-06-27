import React from 'react';
import PropTypes from 'prop-types';

function NumberDatasetsTD(props) {
  const { value, index } = props;

  return (
    <td key={index}>
      <span >{value.length}</span>
    </td>
  );
}

NumberDatasetsTD.propTypes = {
  value: PropTypes.array,
  index: PropTypes.string
};

export default NumberDatasetsTD;
