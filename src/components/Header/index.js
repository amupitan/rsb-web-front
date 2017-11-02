import React from 'react';
import classnames from 'classnames';

// import { Link } from 'react-router-dom'
import Logout from '../Logout';

import './style.css';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <Logout className={classnames('main-logout')} />
    {/* <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/404'>NotFound</Link></li>
      </ul>
    </nav> */}
  </header>
);

export default Header;
