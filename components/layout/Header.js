import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Link } from 'routes';
import MainNav from 'components/ui/MainNav';

export default class Header extends React.Component {
  render() {
    return (
      <header className="l-header-app">
        <div className="l-header-nav">
          <div className="row align-middle">
            <div className="column small-10 medium-4">
              <Link>
                <a href="/" className="logo">
                  <img src="/static/images/logo-cms.png" alt="Partnership for Resilience and Preparedness" />
                </a>
              </Link>
            </div>
            <div className="column small-2 medium-8">
              <MainNav user={this.props.user} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}


Header.propTypes = {
  user: PropTypes.object
};
