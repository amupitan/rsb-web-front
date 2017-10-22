import React from 'react';

const GameHistory = game => {
    const hasGames = game.gameHistory && game.gameHistory.length > 0;
    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Game History</h2>
            </div>
            {(hasGames && Games) || NoGame}
        </div>
    );
}

const Games = (
    <div className="scroll-info panel-body">
        <span>TODO: Display games</span>
    </div>
);

const NoGame = (
    <div className="scroll-info panel-body">
        <span>No game history</span>
    </div>
);

export default GameHistory;