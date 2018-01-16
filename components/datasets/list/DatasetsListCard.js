import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toastr } from 'react-redux-toastr';
import { Link } from 'routes';
import Tooltip from 'rc-tooltip/dist/rc-tooltip';

// Components
import Title from 'components/ui/Title';
import Icon from 'components/ui/Icon';
import DatasetsRelatedContent from 'components/datasets/common/DatasetsRelatedContent';
import CollectionsPanel from 'components/collections-panel';

// Services
import DatasetsService from 'services/DatasetsService';


class DatasetsListCard extends React.Component {
  constructor(props) {
    super(props);
    const { token } = props.user;

    this.state = {
      collectionPanelVisibility: false
    };

    // SERVICES
    this.service = new DatasetsService({ authorization: token });

    // bindings
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  onVisibilityChange(visibility) {
    this.setState({ collectionPanelVisibility: visibility });
  }

  onFavourite() {
    const { dataset, toggleFavourites } = this.props;
    const resource = {
      resourceType: 'dataset',
      resourceId: dataset.id
    };

    toggleFavourites({}, resource);
  }

  onUnfavourite(favourite) {
    const { toggleFavourites } = this.props;
    toggleFavourites(favourite);
  }

  handleDelete = () => {
    const { dataset } = this.props;
    const metadata = dataset.metadata[0];
    toastr.confirm(`Are you sure you want to delete the dataset: ${metadata && metadata.attributes.info ? metadata.attributes.info.name : dataset.name}?`, {
      onOk: () => {
        this.service.deleteData(dataset.id)
          .then(() => {
            toastr.success('Success', 'Dataset removed successfully');
            this.props.onDatasetRemoved(dataset.id);
          })
          .catch(err => toastr.error('Error deleting the dataset', err));
      }
    });
  }

  isInACollection() {
    const { user, dataset } = this.props;
    const { favourites, collections } = user;

    const containedInFavorites = favourites.items.some(fav =>
      fav.attributes.resourceId === dataset.id);
    const containedInCollections = collections.items.some(collection =>
      collection.attributes.resources.some(resource => resource.id === dataset.id));

    return containedInFavorites || containedInCollections;
  }

  render() {
    const { dataset, routes } = this.props;
    const { collectionPanelVisibility } = this.state;
    const metadata = dataset.metadata[0];
    const isInACollection = this.isInACollection();
    const starName = classnames({
      'icon-star-empty': !isInACollection,
      'icon-star-full': isInACollection
    });

    const starClass = classnames({
      '-small': true,
      '-favourited': isInACollection
    });

    return (
      <div className="c-card c-datasets-list-card">
        <div className="card-container">
          <header className="card-header">
            <Link
              route={routes.detail}
              params={{ tab: 'datasets', id: dataset.id }}
            >
              <a>
                <Title className="-default">
                  {metadata ? metadata.attributes.name : dataset.name}
                </Title>
              </a>
            </Link>
            <Title className="-small">
              {dataset.provider}
            </Title>
            <Tooltip
              overlay={<CollectionsPanel
                onDone={() => this.onVisibilityChange(false)}
                resource={dataset}
                resourceType="dataset"
              />}
              placement="bottom"
              trigger="click"
              visible={collectionPanelVisibility}
            >
              <button
                className="star-button"
                onClick={() => this.onVisibilityChange(!collectionPanelVisibility)}
              >
                <Icon name={starName} className={starClass} />
              </button>
            </Tooltip>
          </header>

          <div className="card-content">
            {dataset.status === 'saved' &&
              <DatasetsRelatedContent
                dataset={dataset}
                route={routes.detail}
                buttons={{
                  layer: false
                }}
              />
            }
            {dataset.status !== 'saved' &&
              dataset.status
            }
          </div>

          <div className="actions">
            <a
              role="button"
              tabIndex={0}
              onClick={this.handleDelete}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DatasetsListCard.defaultProps = {
  routes: {
    index: '',
    detail: ''
  },
  dataset: {},
  toggleFavourites: () => {}
};

DatasetsListCard.propTypes = {
  dataset: PropTypes.object,
  routes: PropTypes.object,
  user: PropTypes.object,
  // Callbacks
  onDatasetRemoved: PropTypes.func.isRequired,
  toggleFavourites: PropTypes.func
};

export default DatasetsListCard;
