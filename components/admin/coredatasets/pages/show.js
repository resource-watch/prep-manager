import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import CoreDatasetsForm from 'components/admin/coredatasets/form/CoreDatasetsForm';

function CoreDatasetsShow(props) {
  const { id, user } = props;

  return (
    <div className="c-resources-show">
      <CoreDatasetsForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_core_datasets', { tab: 'core-datasets' })}
      />
    </div>
  );
}

CoreDatasetsShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(CoreDatasetsShow);
