import React from 'react';

// Components
import { Link } from 'routes';
import MainNav from 'components/ui/MainNav';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Banner from 'components/app/common/Banner';

// Constants
import metadata from 'constants/metadata.json';

export default class Header extends React.Component {
  getData(key, value) {
    let data = null;
    // First search for exactly match
    for (let i = metadata.length - 1; i >= 0; i--) {
      if (value === metadata[i][key]) {
        data = metadata[i];
        break;
      }
    }
    // If no data, search for close result
    if (!data) {
      for (let i = metadata.length - 1; i >= 0; i--) {
        if (value.indexOf(metadata[i][key]) > -1) {
          data = metadata[i];
          break;
        }
      }
    }

    return data;
  }

  getCurrentData() {
    // const pathname = this.props.location.pathname;
    const pathname = 'myprep';
    const currentData = this.getData('pathname', pathname);
    return currentData;
  }

  render() {
    const currentData = this.getCurrentData();
    const isHomepage = (currentData.name === 'home');
    let pathname = '';
    // const pathname = window.location.pathname;
    // const summaryCardsPages = ['/contact', '/insights', '/dashboards'];

    if (typeof document !== 'undefined') document.title = currentData.title;
    if (typeof window !== 'undefined') pathname = window.location.pathname;

    return (
      <header className="l-header-app">
        <div className={`l-header-nav ${currentData.name === 'home' ? '-no-bg' : ''}`}>
          <div className="row align-middle">
            <div className="column small-10 medium-4">
              <Link>
                <a href="/" className="logo">
                  <img src="static/images/logo-cms.png" alt="Partnership for Resilience and Preparedness" />
                </a>
              </Link>
            </div>
            <div className="column small-2 medium-8">
              <MainNav />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
