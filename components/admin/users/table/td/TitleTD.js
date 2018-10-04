import React from 'react';
import PropTypes from 'prop-types';

// Next components
import { Link } from 'routes';

function NameTD(props) {
  const { row, value, index } = props;

  return (
    <td key={index} className="main">
      <a>{value}</a>
    </td>
  );
}

NameTD.propTypes = {
  row: PropTypes.object,
  value: PropTypes.string,
  index: PropTypes.string
};

export default NameTD;
