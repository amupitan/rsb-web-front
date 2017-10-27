import React from 'react';

import Avatar from '../ui/Avatar';

export default ({ avatar, lastname, firstname, username }) => {
    function _handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            console.log("Loaded!");
            console.log(reader);
            // this.setState({
            //     file: file,
            //     imagePreviewUrl: reader.result
            // });
        }

        reader.readAsDataURL(file)
    }
    return (
        <div className="rsb-profile-card">
            <Avatar avatar={avatar} alt='profile-pic' className='rsb-profile-img' />
            <input type="file" id="upload-pic" accept="image/jpeg, image/png" onChange={(e) => _handleImageChange(e)} />

            <div className="rsb-profile-info-container">
                <h4><b>{username}</b></h4>
                <p>{`${firstname} ${lastname}`}</p>
            </div>
        </div>
    )
}