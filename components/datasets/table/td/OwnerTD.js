import React from 'react';
import PropTypes from 'prop-types';

class OnwerTD extends React.Component {
  render() {
    const { value } = this.props;
    const { email } = value || {};

    return (
      <td>
        <span>{email}</span>
      </td>
    );
  }
}

OnwerTD.propTypes = {
  email: PropTypes.string
};

export default OnwerTD;
