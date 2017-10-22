import React from 'react';

export default (g) => {
    if (g && g.gameHistory && g.gameHistory.length > 0) {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Game History</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span>TODO: Display games</span>
                </div>
            </div>
        )
    }

    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Game History</h2>
            </div>
            <div className="scroll-info panel-body">
                <span>No game history</span>
            </div>
        </div>
    )
}