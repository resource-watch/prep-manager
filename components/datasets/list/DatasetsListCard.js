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

// helpers
import { belongsToACollection } from 'components/collections-panel/collections-panel-helpers';


class DatasetsListCard extends React.Component {
  constructor(props) {
    super(props);
    const { token } = props.user;

    // SERVICES
    this.service = new DatasetsService({ authorization: token });
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

  render() {
    const { dataset, routes, user } = this.props;
    const metadata = dataset.metadata[0];
    const isInACollection = belongsToACollection(user, dataset);
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
                resource={dataset}
                resourceType="dataset"
              />}
              overlayClassName="c-rc-tooltip"
              overlayStyle={{
                color: '#1a3e62'
              }}
              placement="top"
              trigger="click"
            >
              <button className="c-btn star-button">
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
  dataset: {}
};

DatasetsListCard.propTypes = {
  dataset: PropTypes.object,
  routes: PropTypes.object,
  user: PropTypes.object,
  // Callbacks
  onDatasetRemoved: PropTypes.func.isRequired
};

export default DatasetsListCard;
