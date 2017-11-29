import React from 'react';

export default (game) => {
    if (game && game.gameHistory && game.gameHistory.length > 0) {
        return (
            <div className="col-sm-6 panel panel-default rsb-profile-panel">
                <div className="panel-heading-rsb">
                    <h2>Game Invites</h2>
                </div>
                <div className="scroll-info panel-body populate-requests">
                    <span>TODO: Display requests using PopulateRequests</span>
                </div>
            </div>
        )
    }

    return (
        <div className="col-sm-6 panel panel-default rsb-profile-panel">
            <div className="panel-heading-rsb">
                <h2>Game Invites</h2>
            </div>
            <div className="scroll-info panel-body">
                <span>No game invites</span>
            </div>
        </div>
    )
}