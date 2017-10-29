import React from 'react';

import Avatar from '../ui/Avatar';

export default ({ avatar, lastname, firstname, username }) =>  (
        <div className="rsb-profile-card">
            <Avatar avatar={avatar} alt='profile-pic' className='rsb-profile-img' />            
            <div className="rsb-profile-info-container">
                <h4><b>{username}</b></h4> 
                <p>{`${firstname} ${lastname}`}</p> 
            </div>
      </div>
    );