import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class CollectionPanelItem extends PureComponent {
  onCheck(isChecked) {
    const { onToggleResource, collection } = this.props;
    onToggleResource(isChecked, collection);
  }

  render() {
    const { collection, isChecked } = this.props;
    const { name } = collection;
    // const isChecked = !!(collection.resources.find(collectionResource =>
    //   collectionResource.id === resource.id));

    return (
      <li className="collection-item">
        <input
          type="checkbox"
          name={name}
          onChange={(evt => this.onCheck(evt.currentTarget.checked))}
          defaultChecked={isChecked}
        />
        <span className="collection-name">{name}</span>
      </li>
    );
  }
}

CollectionPanelItem.defaultProps = {
  collection: {},
  resource: {},
  isChecked: false,
  onToggleResource: () => {}
};

CollectionPanelItem.propTypes = {
  collection: PropTypes.object,
  // resource: PropTypes.object,
  onToggleResource: PropTypes.func,
  isChecked: PropTypes.bool
  // resourceType: PropTypes.string.isRequired
};

export default CollectionPanelItem;
