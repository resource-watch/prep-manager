import React from 'react';
import { Link } from 'routes';

function SecondaryNav() {
  return (
    <nav className="c-nav -secondary">
      <ul>
        <li>
          <Link to="/partners"><a>Partners</a></Link>
        </li>
        <li>
          <Link to="/contact"><a>Contact</a></Link>
        </li>
        <li>
          <Link to="/faqs"><a>FAQS</a></Link>
        </li>
      </ul>
    </nav>
  );
}

export default SecondaryNav;
