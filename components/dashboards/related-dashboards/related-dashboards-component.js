import React from 'react';

import Title from 'components/ui/Title';
import RelatedDashboardCard from 'components/ui/card/RelatedDashboardCard';

import styles from './related-dashboards.scss';

function RelatedDashboards(props) {
  if (!props.data.length) return null;

  return (
    <div className="l-related-dashboards -inverse">

      <style jsx>
        {styles}
      </style>

      <div className="l-container">
        <div className="row">
          <div className="columns small-12">
            <Title className="-extrabig -white -line">
              Other dashboards
            </Title>
          </div>
        </div>
        <div className="row">
          {props.data.map(item => (
            <div
              className="columns small-12 medium-6 align-stretch"
              key={item.id}
              style={{ display: 'flex' }}
            >
              <RelatedDashboardCard border>
                <Title className="-white -medium">
                  <a href={`/dashboards/${item.slug}`}>
                    {item.title}
                  </a>
                </Title>

                <p>
                  {item.summary}
                </p>

                {item.partner &&
                  <a href={item.partner.url} target="_blank">
                    <img
                      src={item.partner.images.white_logo || item.partner.images.logo}
                      className="logo"
                      alt={item.partner.name}
                    />
                  </a>
                }
              </RelatedDashboardCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

RelatedDashboards.propTypes = {
  data: React.PropTypes.array
};

RelatedDashboards.defaultProps = {
  data: []
};

export default RelatedDashboards;
