import React from 'react';

import { logout } from '../../lib/authentication';

import './style.css';

const Logout = () => (
    <div className='rsb-logout'>
        <span className='menu-option' onClick={logout}>Logout <i className="fa fa-sign-out"></i></span>
    </div>
);

export default Logout;
