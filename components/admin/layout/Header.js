import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

// Next components
import { Link } from 'routes';

// Components
import HeaderUser from 'components/app/layout/header/HeaderUser';
import HeaderDropdownDashboards from 'components/admin/layout/header/HeaderDropdownDashboards';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myprepActive: false,
      dashboardsActive: false
    };

    this.listeners = {};

    // BINDINGS
    this.toggleDropdown = debounce(this.toggleDropdown.bind(this), 50);
  }

  // This function is debounced. If you don't do that insane things will happen
  toggleDropdown(specificDropdown, to) {
    this.setState({
      ...{ myprepActive: false },
      [specificDropdown]: to
    });
  }


  render() {
    const { url } = this.props;

    const items = [
      {
        name: 'Data',
        pathnames: ['/admin/Data', '/admin/DataDetail'],
        component: <Link route="admin_data"><a>Data</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'Dashboards',
        pathnames: ['/admin/Dashboards', '/admin/DashboardsDetail'],
        component: <HeaderDropdownDashboards
          active={this.state.dashboardsActive}
          onMouseEnter={() => this.toggleDropdown('dashboardsActive', true)}
          onMouseLeave={() => this.toggleDropdown('dashboardsActive', false)}
        />,
        role: 'ADMIN'
      },
      {
        name: 'Resources',
        pathnames: ['/admin/Resources', '/admin/ResourcesDetail'],
        component: <Link route="admin_resources"><a>Resources</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'Partners',
        pathnames: ['/admin/Partners', '/admin/PartnersDetail'],
        component: <Link route="admin_partners"><a>Partners</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'User',
        component: <HeaderUser
          active={this.state.myprepActive}
          onMouseEnter={() => this.toggleDropdown('myprepActive', true)}
          onMouseLeave={() => this.toggleDropdown('myprepActive', false)}
        />
      }
    ];

    return (
      <header className="l-header -transparent">
        <div className="header-secondary">
          {/* We will load the script generated */}
        </div>
        <div className="l-container">
          <div className="header-main">
            <div className="row">
              <div className="column small-3">
                <div className="header-logo -main">
                  <Link route="home">
                    <a>
                      <div className="brand-logo">
                        <img src="/static/images/logo-cms.png" alt="Logo PREP" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="column small-8 small-offset-1">
                <nav className="header-menu">
                  <ul>
                    {items.map((item) => {
                      const activeClassName = classnames({
                        '-active': item.pathnames && item.pathnames.includes(url.pathname)
                      });

                      return (
                        <li key={item.name} className={activeClassName}>
                          {item.component}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  url: {}
};

Header.propTypes = {
  url: PropTypes.object
};
