import React from 'react';
import PropTypes from 'prop-types';

// Components
import CoreDatasetsIndex from 'components/admin/coredatasets/pages/index';
import CoreDatasetsNew from 'components/admin/coredatasets/pages/new';
import CoreDatasetsShow from 'components/admin/coredatasets/pages/show';

export default function CoreDatasetsTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-resources-tab">
      {!id &&
        <CoreDatasetsIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <CoreDatasetsNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <CoreDatasetsShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

CoreDatasetsTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
