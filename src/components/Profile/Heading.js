import React from 'react';

export default ({ profilePic, defaultImg, lastname, firstname, username }) => {
    return (
        <div className="row">
            <div className="col-sm-6 text-right">
                <img src={profilePic || defaultImg} alt="Profile" className="profile-pic" />
            </div>
            <div className="col-sm-6 text-left">
                <h4>{username}</h4>
                <span>Full Name: {firstname} {lastname}</span>
            </div>
        </div>
    )
}