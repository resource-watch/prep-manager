import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

// Next components
import { Link } from 'routes';

// Components
import HeaderUser from 'components/app/layout/header/HeaderUser';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myprepActive: false
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
    const { url, user } = this.props;

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
        component: <Link route="admin_dashboards"><a>Dashboards</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'Indicators',
        pathnames: ['/admin/Indicators', '/admin/IndicatorsDetail'],
        component: <Link route="admin_indicators"><a>Indicators (Data)</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'Insights',
        pathnames: ['/admin/Insights', '/admin/InsightsDetail'],
        component: <Link route="admin_insights"><a>Stories</a></Link>,
        role: 'ADMIN'
      },
      {
        name: 'Tools',
        pathnames: ['/admin/Tools', '/admin/ToolsDetail'],
        component: <Link route="admin_tools"><a>Tools</a></Link>,
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
          user={this.props.user}
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
          <div className="row">
            <div className="column small-12">
              <div className="header-main">
                <div className="header-logo -main">
                  <Link route="home">
                    <a>
                      <div className="brand-logo">
                        <img src="/static/images/logo-cms.png" alt="Logo PREP" />
                      </div>
                      <h1 className="brand-title">Resource Watch</h1>
                    </a>
                  </Link>
                </div>
                <nav className="header-menu">
                  <ul>
                    {items.map((item) => {
                      const activeClassName = classnames({
                        '-active': item.pathnames && item.pathnames.includes(url.pathname)
                      });

                      if (item.role && user.role !== item.role) return null;

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
  url: PropTypes.object,
  user: PropTypes.object
};
