import React from 'react';

import UserRequests from './UserRequests';


export default ({ friendRequests }) => {
    const requests = friendRequests && friendRequests.length > 0 ?
        <UserRequests requests={friendRequests} /> :
        <span>No friend requests</span>;
    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Friend Requests</h2>
                <div className="scroll-info panel-body">
                    {requests}
                </div>
            </div>
        </div>
    );
}