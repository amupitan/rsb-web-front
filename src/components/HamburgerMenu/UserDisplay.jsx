import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../ui/Avatar';

const UserDisplay = ({ username, firstname, lastname, avatar }) => {
    return (
        <div>
            <Link to='/user' >
                <div className="text-center">
                    <Avatar avatar={avatar} alt='' className='rsb-user-picture' />
                </div>
                <div className="text-center">
                    <h1 className='rsb-menu-username'>{`${firstname} ${lastname}`}</h1>
                </div>
                <div className="text-center">
                    <h1 className='rsb-menu-name'>{`@${username}`}</h1>
                </div>
            </Link>
        </div>
    );
}



export default UserDisplay;