import React from 'react';
import PropTypes from 'prop-types';

// Components
import ResourcesTable from 'components/admin/resources/table/ResourcesTable';

export default function ResourcesIndex(props) {
  const { user } = props;

  return (
    <div className="c-resources-index">
      <ResourcesTable
        application={[process.env.APPLICATIONS]}
        authorization={user.token}
      />
    </div>
  );
}

ResourcesIndex.propTypes = {
  user: PropTypes.object.isRequired
};

ResourcesIndex.defaultProps = {
  user: {}
};
