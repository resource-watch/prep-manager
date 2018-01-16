import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import CollectionPanelItem from './collections-panel-item/collections-panel-item-component';

// constants
import { FAVOURITES_COLLECTION } from './collections-panel-constants';

// styles
import styles from './collections-panel-styles.scss';

class CollectionsPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newCollection: null // new collection's name
    };
  }

  onAddCollection() {
    const { addCollection } = this.props;
    const { newCollection } = this.state;

    if ((newCollection || '').toLowerCase() === 'favourites') {
      toastr.error('Duplicated Favourites list', 'You cannot duplicate this list.');
      return;
    }

    addCollection(newCollection);
  }

  onToggleFavourite() {
    const { toggleFavourite, favourites, resource, resourceType } = this.props;
    const favourite = favourites.find(fav => fav.resourceId === resource.id) || {};
    toggleFavourite(favourite, { resourceId: resource.id, resourceType });
  }

  onToggleResource(isAdded, collection) {
    const { toggleResource, resource, resourceType } = this.props;
    toggleResource(isAdded, collection.id, { id: resource.id, type: resourceType });
  }

  hanldeKeyPress(key) {
    if (key !== 'Enter') return;

    this.onAddCollection();
  }

  renderCollections() {
    const { collections, resource, resourceType, favourites } = this.props;

    const favouriteCollection = (
      <CollectionPanelItem
        key={FAVOURITES_COLLECTION.id}
        collection={FAVOURITES_COLLECTION}
        resource={resource}
        resourceType={resourceType}
        isChecked={favourites.some(favourite =>
          favourite.resourceId === resource.id)}
        onToggleResource={() => this.onToggleFavourite()}
      />
    );

    const collectionItems = collections.map(collection =>
      (<CollectionPanelItem
        key={collection.id}
        collection={collection}
        resource={resource}
        resourceType={resourceType}
        isChecked={collection.resources.some(collectionResource =>
          collectionResource.id === resource.id)}
        onToggleResource={(isAdded, selectedCollection) =>
          this.onToggleResource(isAdded, selectedCollection)}
      />));

    collectionItems.unshift(favouriteCollection);

    return (
      <ul className="collection-list">
        {collectionItems}
      </ul>
    );
  }

  render() {
    const { onDone } = this.props;

    return (
      <div className="c-collections-panel">
        <style jsx>
          {styles}
        </style>
        <div className="new-collection-container">
          <input
            type="text"
            name="new-collection"
            placeholder="New collection"
            onChange={evt => this.setState({ newCollection: evt.currentTarget.value })}
            onKeyPress={evt => this.hanldeKeyPress(evt.key)}
          />
          <button
            className="c-button"
            onClick={() => this.onAddCollection()}
          >
            Add
          </button>
        </div>
        <div className="collection-list-container">
          {this.renderCollections()}
        </div>
        <div className="actions">
          <button
            className="c-button"
            onClick={() => onDone()}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

CollectionsPanel.defaultProps = {
  collections: [],
  favourites: [],
  resource: {},
  addCollection: () => {},
  toggleResource: () => {},
  toggleFavourite: () => {},
  onDone: () => {}
};

CollectionsPanel.propTypes = {
  collections: PropTypes.array,
  favourites: PropTypes.array,
  resource: PropTypes.object,
  addCollection: PropTypes.func,
  toggleResource: PropTypes.func,
  toggleFavourite: PropTypes.func,
  onDone: PropTypes.func,
  resourceType: PropTypes.oneOf(['dataset', 'layer', 'widget'])
};

export default CollectionsPanel;
