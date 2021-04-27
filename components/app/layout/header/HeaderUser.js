import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import { toastr } from 'react-redux-toastr';

// Connect
import { connect } from 'react-redux';

// Utils
import { get } from 'utils/request';

// Components
import TetherComponent from 'react-tether';
import Icon from 'components/ui/Icon';

class HeaderUser extends React.Component {
  /**
   * UI EVENTS
   * - logout
  */
  logout(e) {
    if (e) {
      e.preventDefault();
    }

    // Get to logout
    get({
      url: `${process.env.CONTROL_TOWER_URL}/auth/logout`,
      withCredentials: true,
      onSuccess: () => {
        try {
          localStorage.removeItem('user');
          window.location.href = `/logout?callbackUrl=${window.location.href}`;
        } catch (err) {
          window.location.href = `/logout?callbackUrl=${window.location.href}`;
        }
      },
      onError: (err) => {
        toastr.error('Error', err);
      }
    });
  }


  render() {
    const { user } = this.props;

    if (user.token) {
      const photo = (user.photo) ? `url(${user.photo})` : 'none';

      return (
        <div className="c-avatar" style={{ backgroundImage: photo }}>
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
            <Link route="admin_myprep">
              <a
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
              >
                {(!user.photo && user.email) &&
                  <span className="avatar-letter" >
                    {user.email.split('')[0]}
                  </span>
                }
              </a>
            </Link>
            {/* Second child: If present, this item will be tethered to the the first child */}
            {this.props.active &&
              <ul
                className="header-dropdown-list"
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
              >
                <li className="header-dropdown-list-item">
                  <Link route="admin_myprep" params={{ tab: 'dashboards' }}>
                    <a>Dashboards</a>
                  </Link>
                </li>
                <li className="header-dropdown-list-item">
                  <Link route="admin_myprep" params={{ tab: 'profile' }}>
                    <a>Profile</a>
                  </Link>
                </li>
                {user.role === 'ADMIN' &&
                  <li className="header-dropdown-list-item">
                    <a href="/admin">Admin</a>
                  </li>
                }
                <li className="header-dropdown-list-item">
                  <a onClick={this.logout} href="/logout">Logout</a>
                </li>
              </ul>
            }
          </TetherComponent>
        </div>
      );
    }

    if (!user.token) {
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
          <span
            className="header-menu-link"
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          >
            <Icon name="icon-user" className="-medium" />
          </span>

          {/* Second child: If present, this item will be tethered to the the first child */}
          {this.props.active &&
            <ul
              className="header-dropdown-list"
              onMouseEnter={this.props.onMouseEnter}
              onMouseLeave={this.props.onMouseLeave}
            >
              <li className="header-dropdown-list-item">
                <a href={`https://production-api.globalforestwatch.org/auth/facebook?callbackUrl=${process.env.CALLBACK_URL}&applications=${process.env.APPLICATIONS}&token=true`}>
                  Facebook
                </a>
              </li>
              <li className="header-dropdown-list-item">
                <a href={`https://production-api.globalforestwatch.org/auth/google?callbackUrl=${process.env.CALLBACK_URL}&applications=${process.env.APPLICATIONS}&token=true`}>
                  Google
                </a>
              </li>
              <li className="header-dropdown-list-item">
                <a href={`https://production-api.globalforestwatch.org/auth/twitter?callbackUrl=${process.env.CALLBACK_URL}&applications=${process.env.APPLICATIONS}&token=true`}>
                  Twitter
                </a>
              </li>
            </ul>
          }
        </TetherComponent>
      );
    }
    return null;
  }
}

HeaderUser.propTypes = {
  user: PropTypes.object,
  active: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};


export default connect(
  state => ({
    user: state.user
  })
)(HeaderUser);
