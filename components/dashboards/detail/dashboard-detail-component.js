import React from 'react';
import PropTypes from 'prop-types';

// Wysiwyg
import Wysiwyg from 'vizz-wysiwyg';
import WidgetBlock from 'components/dashboards/wysiwyg/widget-block/widget-block';
import WidgetBlockEdition from 'components/dashboards/wysiwyg/widget-block-edition/widget-block-edition';
import ToolBlock from 'components/dashboards/wysiwyg/tool-block/tool-block';
import ToolBlockEdition from 'components/dashboards/wysiwyg/tool-block-edition/tool-block-edition';
import InsightBlock from 'components/dashboards/wysiwyg/insight-block/insight-block';
import InsightBlockEdition from 'components/dashboards/wysiwyg/insight-block-edition/insight-block-edition';

export default function DashboardDetail({ dashboardDetail }) {
  let items = [];

  try {
    items = JSON.parse(dashboardDetail.dashboard.content || '[]');
  } catch (e) {
    console.error(e);
  }

  return (
    <Wysiwyg
      readOnly
      items={items}
      blocks={{
        widget: {
          Component: WidgetBlock,
          EditionComponent: WidgetBlockEdition,
          icon: 'icon-widget',
          label: 'Widget',
          renderer: 'modal'
        },
        tool: {
          Component: ToolBlock,
          EditionComponent: ToolBlockEdition,
          icon: 'icon-metadata',
          label: 'Tool',
          renderer: 'modal'
        },
        insight: {
          Component: InsightBlock,
          EditionComponent: InsightBlockEdition,
          icon: 'icon-metadata',
          label: 'Story',
          renderer: 'modal'
        }
      }}
    />
  );
}

DashboardDetail.propTypes = {
  dashboardDetail: PropTypes.object
};

DashboardDetail.defaultProps = {
  dashboardDetail: {}
};
