import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';


// Components
import WidgetsForm from 'components/widgets/form/WidgetsForm';

function WidgetsNew(props) {
  const { user, dataset } = props;

  return (
    <div className="c-widgets-new">
      <WidgetsForm
        basic
        authorization={user.token}
        onSubmit={() => {
          if (dataset) {
            Router.pushRoute('admin_myprep_detail', { tab: 'datasets', subtab: 'widgets', id: dataset });
          } else {
            Router.pushRoute('admin_myprep', { tab: 'widgets', subtab: 'my_widgets' });
          }
        }}
        dataset={dataset}
      />
    </div>
  );
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
