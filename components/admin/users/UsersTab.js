import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import UsersIndex from 'components/admin/users/pages/index';

function UsersTab(props) {
  const { tab, subtab, id, user } = props;

  return (
    <div className="c-tools-tab">
      {!id &&
        <UsersIndex tab={tab} subtab={subtab} id={id} user={user} />
      }
    </div>
  );
}

UsersTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(UsersTab);
