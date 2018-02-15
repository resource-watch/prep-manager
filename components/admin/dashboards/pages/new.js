import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';


// Components
import DashboardsForm from 'components/dashboards/form/DashboardsForm';

function DashboardsNew(props) {
  const { user, routes } = props;

  return (
    <div className="c-dashboards-new">
      <DashboardsForm
        user={user}
        duplicateId={routes.query.duplicateId}
        onSubmit={() => Router.pushRoute('admin_dashboards', { tab: 'dashboards' })}
      />
    </div>
  );
}

DashboardsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired,
  routes: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user,
  routes: state.routes
});

export default connect(mapStateToProps, null)(DashboardsNew);
