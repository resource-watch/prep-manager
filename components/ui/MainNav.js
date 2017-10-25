import React from 'react';
import { Link } from 'routes';

function MainNav() {
  return (
    <nav className="c-nav -main">
      <ul>
        <li>
          <Link>
            <a href="/about">
              About
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href="/explore">
              Explore
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href="/dashboards">
              Dashboards
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href="/insights">
              Stories
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href="/create">
              Create
            </a>
          </Link>
        </li>
        <li>
          <Link>
            <a href="/resources">
              Resources
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
