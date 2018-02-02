import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Utils
import { logEvent } from 'utils/analytics';

// Components
import DatasetsForm from 'components/datasets/form/DatasetsForm';

class DatasetsNew extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  /**
   * Event handler executed when a new dataset
   * has just been created
   * @param {string} datasetId ID of the dataset
   */
  onSubmit(datasetId) { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new dataset', 'Save');
    Router.pushRoute('admin_myprep_detail', { tab: 'datasets', id: datasetId });
  }

  /**
   * Event handler executed when the user cancels
   * the creation of a new dataset
   */
  onBack() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new dataset', 'Cancel');
    window.history.back();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="c-datasets-new">
        <DatasetsForm
          basic
          application={[process.env.APPLICATIONS]}
          authorization={user.token}
          onSubmit={this.onSubmit}
          onBack={this.onBack}
        />
      </div>
    );
  }
}

DatasetsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

export default DatasetsNew;
