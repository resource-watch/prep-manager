import React from 'react';
import PropTypes from 'prop-types';

// Components
import SocialNav from 'components/ui/SocialNav';
import SecondaryNav from 'components/ui/SecondaryNav';
import PartnersSlider from 'components/partners/PartnersSlider';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="l-footer-app">
        <div className="l-footer-top -inverse">
          <div className="row">
            <div className="column small-12">
              <PartnersSlider route="myprep" />
            </div>
          </div>
        </div>
        <div className="l-footer-sep">
          <div className="row">
            <div className="column small-12">
              <div className="footer-sep-item" />
            </div>
          </div>
        </div>
        <div className="l-footer-down">
          <div className="row">
            <div className="column small-6 align-middle">
              <SocialNav />
            </div>
            <div className="column small-6 align-middle">
              <SecondaryNav />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}


Footer.propTypes = {
};
