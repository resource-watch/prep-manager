import React from 'react';
import PropTypes from 'prop-types';

// Components
import ResourcesIndex from 'components/admin/resources/pages/index';
import ResourcesNew from 'components/admin/resources/pages/new';
import ResourcesShow from 'components/admin/resources/pages/show';

export default function ResourcesTab(props) {
  const { tab, subtab, id } = props;

  return (
    <div className="c-resources-tab">
      {!id &&
        <ResourcesIndex tab={tab} subtab={subtab} id={id} />
      }

      {id && id === 'new' &&
        <ResourcesNew tab={tab} subtab={subtab} id={id} />
      }

      {id && id !== 'new' &&
        <ResourcesShow tab={tab} subtab={subtab} id={id} />
      }
    </div>
  );
}

ResourcesTab.propTypes = {
  tab: PropTypes.string,
  id: PropTypes.string,
  subtab: PropTypes.string
};
