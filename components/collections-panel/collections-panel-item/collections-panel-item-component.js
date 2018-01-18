import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/ui/Spinner';

class CollectionPanelItem extends PureComponent {
  onCheck = (evt) => {
    const isChecked = evt.currentTarget.checked;
    const { onToggleCollection, collection } = this.props;
    onToggleCollection(isChecked, collection);
  }

  render() {
    const { collection, isChecked, loading } = this.props;
    const { name } = collection;

    return (
      <li className="collection-item">
        {loading && <Spinner isLoading={loading} className="-light" />}
        <input
          type="checkbox"
          name={name}
          onChange={this.onCheck}
          defaultChecked={isChecked}
        />
        <span className="collection-name">{name}</span>
      </li>
    );
  }
}

CollectionPanelItem.defaultProps = {
  collection: {},
  isChecked: false,
  onToggleCollection: () => {}
};

CollectionPanelItem.propTypes = {
  collection: PropTypes.object,
  isChecked: PropTypes.bool,
  loading: PropTypes.bool,
  onToggleCollection: PropTypes.func
};

export default CollectionPanelItem;
