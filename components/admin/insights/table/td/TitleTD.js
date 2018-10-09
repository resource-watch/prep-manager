import React from 'react';
import PropTypes from 'prop-types';

// Next components
import { Link } from 'routes';

function NameTD(props) {
  const { row, value, index } = props;

  return (
    <td key={index} className="main">
      <Link route="admin_insights_detail" params={{ tab: 'insights', id: row.id }}>
        <a>{value}</a>
      </Link>
    </td>
  );
}

NameTD.propTypes = {
  row: PropTypes.object,
  value: PropTypes.string,
  index: PropTypes.string
};

export default NameTD;
