import React from 'react';
import { Router } from 'routes';

// Components
import AreasForm from 'components/areas/AreasForm';

// Utils
import { logEvent } from 'utils/analytics';

class AreasNew extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  /**
   * Event handler executed when a new AoI
   * has just been created
   */
  onSubmit() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new AoI', 'Save');
    Router.pushRoute('admin_myprep', { tab: 'areas' });
  }

  /**
   * Event handler executed when the user cancels
   * the creation of a new AoI
   */
  onBack() { // eslint-disable-line class-methods-use-this
    logEvent('User account', 'Create new AoI', 'Cancel');
    Router.pushRoute('admin_myprep', { tab: 'areas' });
  }

  render() {
    return (
      <div className="c-areas-new">
        <AreasForm
          mode="new"
          onSubmit={this.onSubmit}
          onBack={this.onBack}
        />
      </div>
    );
  }
}

export default AreasNew;
