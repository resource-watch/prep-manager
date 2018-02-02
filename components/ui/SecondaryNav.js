import React from 'react';
import { Link } from 'routes';

function SecondaryNav() {
  return (
    <nav className="c-nav -secondary">
      <ul>
        <li>
          <a href="/partners">Partners</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/faqs">FAQS</a>
        </li>
      </ul>
    </nav>
  );
}

export default SecondaryNav;
