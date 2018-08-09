import React from 'react';
import PropTypes from 'prop-types';

// Components
import CoreDatasetsTable from 'components/admin/coredatasets/table/CoreDatasetsTable';

export default function CoreDatasetsIndex(props) {
  const { user } = props;

  return (
    <div className="c-resources-index">
      <CoreDatasetsTable
        application={[process.env.APPLICATIONS]}
        authorization={user.token}
      />
    </div>
  );
}

CoreDatasetsIndex.propTypes = {
  user: PropTypes.object.isRequired
};

CoreDatasetsIndex.defaultProps = {
  user: {}
};
