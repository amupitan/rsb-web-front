import React from 'react';

const GameHistory = game => {
    // const hasGames = game.gameHistory && game.gameHistory.length > 0;

    const hasGames = [{
        name: "Game Name",
        // startTime: (new Date(1 + ":" + 0)).toISOString(),
        // endTime: (new Date(2 + ":" + 0)).toISOString(),
        sport: "soccer",
        maxAge: 12,
        minAge: 14,
        lat: 42,
        lng: -93.5,
        rating: 0
    }]

    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Game History</h2>
            </div>
            {(hasGames && Games(hasGames)) || NoGame}
        </div>
    );
}

const Games = (hasGames) => {
    return (
        <div className="scroll-info panel-body">
            {
                hasGames.map((game, i) => {
                    const { name, sport, lat, lng } = game;
                    return (
                        <div key={i} className="populate-requests row">
                            {/* <Link to={`/user/${username}`} key={i} > */}
                            <div className="col-sm-4 col-sm-pull">
                                <span><b>{name}</b></span>
                            </div>
                            <div className="col-sm-4">
                                <span>{lat} {lng}</span><br />
                                <span>{sport}</span><br />
                            </div>
                            {/* </Link> */}
                        </div>
                    );
                })
            }
        </div>
    )
};

const NoGame = (
    <div className="scroll-info panel-body">
        <span>No game history</span>
    </div>
);

export default GameHistory;