import React from 'react';

import UserRequests from './UserRequests';


const FriendRequest = ({ friendRequests, onReview }) => {
    const requests = friendRequests && friendRequests.length > 0 ?
        <UserRequests requests={friendRequests} onReview={onReview} /> :
        <span>No friend requests</span>;

    return (
        <div className="col-sm-6 panel panel-default rsb-profile-panel">
            <div className="panel-heading-rsb">
                <h2>Friend Requests</h2>
            </div>
            <div className="scroll-info panel-body">
                {requests}
            </div>
        </div>
    );
};

export default FriendRequest;