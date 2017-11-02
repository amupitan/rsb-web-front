import React from 'react';

import Avatar from '../ui/Avatar';

const Heading = ({ avatar, lastname, firstname, username, onImageChange, errorMessage }) => (
    <div>
        <div className="rsb-profile-card">
            <Avatar avatar={avatar} alt='profile-pic' className='rsb-profile-img' />
            {
                onImageChange && <div className='rsb-profile-edit-icon'>
                    <label htmlFor="image-upload" className="upload-pic" ><span className="rsb-profile-dot">&#x270E;</span></label>
                    <input type="file" id="image-upload" accept="image/jpeg, image/png" className='rsb-profile-image-upload' onChange={onImageChange} />
                </div>
            }
            <div className="rsb-profile-info-container">
                <h4><b>{username}</b></h4>
                <p>{`${firstname} ${lastname}`}</p>
            </div>
        </div>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
    </div>
);

export default Heading;
