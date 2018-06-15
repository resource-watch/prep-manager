import React from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

// Components
import HeaderUser from 'components/app/layout/header/HeaderUser';


export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutActive: false,
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

  handleHover(newState) {
    this.setState(newState);
  }

  render() {
    const { aboutActive, myprepActive } = this.state;

    return (
      <nav className="c-nav -main">
        <ul>
          <li
            onMouseEnter={() => this.handleHover({ aboutActive: true })}
            onMouseLeave={() => this.handleHover({ aboutActive: false })}
          >
            <a href="/about">About</a>
            { aboutActive && <div className="submenu">
              <ul className="submenu-list">
                <li><a href="/partners">Partners</a></li>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/how-to">How to</a></li>
                <li><a href="/contact">Contact us</a></li>
              </ul>
            </div>}
          </li>
          <li><a href="/explore">Explore</a></li>
          <li><a href="/dashboards">Dashboards</a></li>
          <li><a href="/stories">Stories</a></li>
          <li><a href="/resources">Resources</a></li>
          <li>
            <HeaderUser
              user={this.props.user}
              active={myprepActive}
              onMouseEnter={() => this.toggleDropdown('myprepActive', true)}
              onMouseLeave={() => this.toggleDropdown('myprepActive', false)}
            />
          </li>
        </ul>
      </nav>
    );
  }
}


MainNav.propTypes = {
  user: PropTypes.object
};
