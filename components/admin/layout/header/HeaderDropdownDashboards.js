import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// Components
import TetherComponent from 'react-tether';

export default function HeaderDropdownDashboards(props) {
  return (
    <TetherComponent
      attachment="top center"
      constraints={[{
        to: 'window'
      }]}
      targetOffset="0 0"
      classes={{
        element: 'c-header-dropdown'
      }}
    >
      {/* First child: This is what the item will be tethered to */}
      <Link route="admin_dashboards" >
        <a
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          Dashboards
        </a>
      </Link>
      {/* Second child: If present, this item will be tethered to the the first child */}
      {props.active &&
        <ul
          className="header-dropdown-list"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <li className="header-dropdown-list-item">
            <Link route="admin_insights">
              <a>Stories</a>
            </Link>
          </li>
          <li className="header-dropdown-list-item">
            <Link route="admin_tools">
              <a>Tools</a>
            </Link>
          </li>
        </ul>
      }
    </TetherComponent>
  );
}

HeaderDropdownDashboards.propTypes = {
  active: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
