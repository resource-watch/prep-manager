import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { substitution } from 'utils/utils';

// Next components
import { Link } from 'routes';

class DuplicateAction extends React.Component {
  getParsedParams() {
    const { data, action } = this.props;

    return JSON.parse(substitution(JSON.stringify(action.params), [{ key: 'duplicateId', value: data.id }]));
  }

  render() {
    const { action } = this.props;

    return (
      <Link
        route={action.route}
        params={this.getParsedParams(action.params)}
      >
        <a className="c-btn">Duplicate</a>
      </Link>
    );
  }
}

DuplicateAction.propTypes = {
  data: PropTypes.object,
  action: PropTypes.object
};

export default DuplicateAction;
