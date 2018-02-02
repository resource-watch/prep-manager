import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Utils
import { logEvent } from 'utils/analytics';

// Components
import WidgetsForm from 'components/widgets/form/WidgetsForm';

class WidgetsNew extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  /**
   * Event handler executed when a new widget
   * has just been created
   */
  onSubmit() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new widget', 'Save');
    if (this.props.dataset) {
      Router.pushRoute('admin_myprep_detail', { tab: 'datasets', subtab: 'widgets', id: this.props.dataset });
    } else {
      Router.pushRoute('admin_myprep', { tab: 'widgets', subtab: 'my_widgets' });
    }
  }

  /**
   * Event handler executed when the user cancels
   * the creation of a new widget
   */
  onBack() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new widget', 'Cancel');
    window.history.back();
  }

  render() {
    const { user, dataset } = this.props;

    return (
      <div className="c-widgets-new">
        <WidgetsForm
          basic
          authorization={user.token}
          onSubmit={this.onSubmit}
          onBack={this.onBack}
          dataset={dataset}
        />
      </div>
    );
  }
}

WidgetsNew.propTypes = {
  dataset: PropTypes.string, // ID of the dataset that should be pre-selected
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(WidgetsNew);
