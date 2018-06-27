import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import CoreDatasetsForm from 'components/admin/coredatasets/form/CoreDatasetsForm';

function CoreDatasetsNew(props) {
  const { user } = props;

  return (
    <div className="c-resources-new">
      <CoreDatasetsForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_resources', { tab: 'core-datasets' })}
      />
    </div>
  );
}

CoreDatasetsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(CoreDatasetsNew);
