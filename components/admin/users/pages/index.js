import React from 'react';
import PropTypes from 'prop-types';

// Components
import UsersTable from 'components/admin/users/table/UsersTable';

export default function UsersIndex(props) {
  const { user } = props;

  return (
    <div className="c-tools-index">
      <UsersTable
        application={[process.env.APPLICATIONS]}
        authorization={user.token}
      />
    </div>
  );
}

UsersIndex.propTypes = {
  user: PropTypes.object.isRequired
};

UsersIndex.defaultProps = {
  user: {}
};
