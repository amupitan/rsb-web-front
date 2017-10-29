import React from 'react';

import Avatar from '../ui/Avatar';

export default ({ avatar, lastname, firstname, username }) => {
    return (
        <div className="row">
            <div className="col-sm-6 text-right">
                <Avatar avatar={avatar} alt='profile-pic' className='profile-pic' />
            </div>
            <div className="col-sm-6 text-left">
                <h4>{username}</h4>
                <span>Full Name: {firstname} {lastname}</span>
            </div>
        </div>
    )
}