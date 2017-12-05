import React from 'react';
import { GameRequest } from './UserRequests';

export default ({ gameRequests, onReview, games }) => {
    if (gameRequests && gameRequests.length > 0) {
        return (
            <div className="col-sm-6 panel panel-default rsb-profile-panel">
                <div className="panel-heading-rsb">
                    <h2>Game Invites</h2>
                </div>
                <div className="scroll-info panel-body ">
                    <GameRequest requests={gameRequests} onReview={onReview} games={games} />
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