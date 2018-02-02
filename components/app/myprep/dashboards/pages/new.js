import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Utils
import { logEvent } from 'utils/analytics';

// Components
import DashboardsForm from 'components/dashboards/form/DashboardsForm';

class DashboardsNew extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  /**
   * Event handler executed when a new dashboard
   * has just been created
   */
  onSubmit() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new dashboard', 'Save');
    Router.pushRoute('admin_myprep', { tab: 'dashboards' });
  }

  /**
   * Event handler executed when the user cancels
   * the creation of a new dashboard
   */
  onBack() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new dashboard', 'Cancel');
    window.history.back();
  }

  render() {
    const { user, routes } = this.props;

    return (
      <div className="c-dashboards-new">
        <DashboardsForm
          basic
          user={user}
          duplicateId={routes.query.duplicateId}
          onSubmit={this.onSubmit}
          onBack={this.onBack}
        />
      </div>
    );
  }
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
