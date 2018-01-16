import { connect } from 'react-redux';
import { addCollection, toggleFavourite, addResourceToCollection, removeResourceFromCollection } from 'redactions/user';
import Component from './collections-panel-component';
import { parseCollections, parseFavourites } from './collections-panel-selectors';

const mapStateToProps = state => ({
  collections: parseCollections(state),
  favourites: parseFavourites(state)
});

const mapDispatchToProps = dispatch => ({
  addCollection: collectionName => dispatch(addCollection(collectionName)),
  toggleResource: (isAdded, collectionId, resource) => {
    if (isAdded) dispatch(addResourceToCollection(collectionId, resource));
    if (!isAdded) dispatch(removeResourceFromCollection(collectionId, resource));
  },
  toggleFavourite: (favourite, resource) => {
    dispatch(toggleFavourite(favourite, resource));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
