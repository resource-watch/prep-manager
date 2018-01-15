import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import Icon from 'components/ui/Icon';

function Breadcrumbs(props) {
  const classNames = classnames({
    [props.className]: !!props.className
  });

  return (
    <ul className={`c-breadcrumbs ${classNames}`}>
      {props.items.map(item => (
        <li key={item.name} className="item">
          {item.route &&
            <Link route={item.route} params={item.params}>
              <a>
                {props.items.length === 1 &&
                  <Icon className="c-icon -smaller" name="icon-arrow-left" />
                }
                <span>{item.name}</span>
              </a>
            </Link>
          }

          {item.href &&
            <a href={item.href}>
              {props.items.length === 1 &&
                <Icon className="c-icon -smaller" name="icon-arrow-left" />
              }
              <span>{item.name}</span>
            </a>
          }

          {!item.route && !item.href &&
            <span>
              <span>{item.name}</span>
            </span>
          }
        </li>
      ))}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string
};

Breadcrumbs.defaultProps = {
  items: [],
  className: ''
};

export default Breadcrumbs;
