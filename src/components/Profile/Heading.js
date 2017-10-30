import React from 'react';

import Avatar from '../ui/Avatar';

export default ({ avatar, lastname, firstname, username, handleImageChange }) => (
    <div className="rsb-profile-card">
        <Avatar avatar={avatar} alt='profile-pic' className='rsb-profile-img' />
        <label htmlFor="image-upload" className="upload-pic" >Upload Profile Picture</label>
        <input type="file" id="image-upload" accept="image/jpeg, image/png" onChange={(e) => handleImageChange(e)} />
        <div className="rsb-profile-info-container">
            <h4><b>{username}</b></h4>
            <p>{`${firstname} ${lastname}`}</p>
        </div>
    </div>
)
