import React from 'react';

import { logout } from '../../lib/authentication';

import Button from '../ui/RSBButton';

import './style.css';

const Logout = ({ className }) => (
    <div className={className}>
        <Button onClickFunction={logout} glyphicons="glyphicon glyphicon-log-out"
            buttonType="danger" />
    </div>
);

export default Logout;
