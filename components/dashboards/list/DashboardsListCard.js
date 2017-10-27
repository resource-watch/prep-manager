import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'routes';

// Components
import Title from 'components/ui/Title';

class DashboardsListCard extends React.Component {
  render() {
    const { dashboard, routes } = this.props;
    console.log(dashboard);
    const imgSrc = dashboard.partner.logo && dashboard.partner.logo !== '' ?
      dashboard.partner.logo :
      dashboard.partner.thumbnail;

    return (
      <div className="c-card">
        <div className="card-container">
          <header className="card-header">
            <Link
              route={routes.detail}
              params={{ tab: 'dashboards', id: dashboard.id }}
            >
              <a>
                <Title className="-default">
                  {dashboard.title}
                </Title>
              </a>
            </Link>
          </header>

          <div className="card-content">
            <p dangerouslySetInnerHTML={{__html: dashboard.summary || dashboard.content }} />

            <div className="card-logo-container">
              <img className="logo" src={dashboard.partner.logo} alt={dashboard.partner.name} />
            </div>
          </div>

          <footer className="card-footer">
            <span>{dashboard.attribution}</span>
          </footer>
        </div>
      </div>
    );
  }
}

DashboardsListCard.defaultProps = {
  routes: {
    index: '',
    detail: ''
  },
  dashboard: {}
};

DashboardsListCard.propTypes = {
  dashboard: PropTypes.object,
  routes: PropTypes.object
};

export default DashboardsListCard;
