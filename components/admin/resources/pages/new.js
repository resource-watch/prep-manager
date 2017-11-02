import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import ResourcesForm from 'components/admin/resources/form/ResourcesForm';

function ResourcesNew(props) {
  const { user } = props;

  return (
    <div className="c-resources-new">
      <ResourcesForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_resources', { tab: 'resources' })}
      />
    </div>
  );
}

ResourcesNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(ResourcesNew);
