import React from 'react';

import PopulateRequests from './PopulateRequests';


export default ({ friendRequests }) => {
    if (friendRequests && friendRequests.length > 0) {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friend Requests</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={friendRequests}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Friend Requests</h2>
            </div>
            <div className="scroll-info panel-body">
                <span>No friend requests</span>
            </div>
        </div>
    )
}