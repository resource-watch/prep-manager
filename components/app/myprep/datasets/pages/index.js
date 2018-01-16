import React from 'react';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';

// Redux
import { connect } from 'react-redux';

// Components
import Aside from 'components/ui/Aside';
import DatasetsList from 'components/datasets/list/DatasetsList';
import MyPREPDatasetsStarred from 'components/app/myprep/datasets/MyPREPDatasetsStarred';

// Constants
const DATASET_SUBTABS = [{
  label: 'My datasets',
  value: 'my_datasets',
  route: 'admin_myprep',
  params: { tab: 'datasets', subtab: 'my_datasets' }
}];

function DatasetsIndex(props) {
  const { id, user } = props;
  const subtab = props.subtab || 'my_datasets';

  return (
    <div className="c-datasets-index">
      <StickyContainer>
        <div className="row l-row">
          <div className="columns small-12 medium-3">
            <Sticky>
              {
                ({ style }) => (
                  <div style={style}>
                    <Aside
                      items={DATASET_SUBTABS}
                      selected={subtab}
                    />
                  </div>
                )
              }
            </Sticky>
          </div>

          <div className="columns small-12 medium-9">
            {subtab === 'starred' &&
              <MyPREPDatasetsStarred user={user} dataset={id} embed />
            }

            {subtab === 'my_datasets' &&
              <DatasetsList
                getDatasetsFilters={{
                  userId: props.user.id
                }}
                routes={{
                  index: 'admin_myprep',
                  detail: 'admin_myprep_detail'
                }}
              />
            }
          </div>

        </div>
      </StickyContainer>
    </div>
  );
}

DatasetsIndex.propTypes = {
  id: PropTypes.string,
  subtab: PropTypes.string,
  // Store
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(DatasetsIndex);
