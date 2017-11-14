import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import ResourcesForm from 'components/admin/resources/form/ResourcesForm';

function ResourcesShow(props) {
  const { id, user } = props;

  return (
    <div className="c-resources-show">
      <ResourcesForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_dashboards', { tab: 'resources' })}
      />
    </div>
  );
}

ResourcesShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(ResourcesShow);
