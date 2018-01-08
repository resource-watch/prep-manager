import React from 'react';
import Card from '../Cards/Card';

function RelatedDasboards(props) {
  if (!props.data.length) return null;

  return (
    <div className="l-related-dashboards -inverse">
      <div className="row">
        <div className="columns small-12">
          <h2 className="-left"> Other dashboards </h2>
        </div>
      </div>
      <div className="row">
        {props.data.map(item => (
          <div
            className="columns small-12 medium-6 align-stretch"
            key={item.id}
            style={{ display: 'flex' }}
          >
            <Card border>
              <h3>
                <a to={`/dashboards/${item.slug}`}>
                  {item.title}
                </a>
              </h3>

              <p>
                {item.summary}
              </p>

              {item.partner &&
                <a href={item.partner.url} target="_blank">
                  <img
                    src={config.assetsUrl + item.partner.images.logo}
                    className="logo"
                    alt={item.partner.name}
                  />
                </a>
              }
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

RelatedDasboards.propTypes = {
  data: React.PropTypes.array
};

export default RelatedDasboards;
