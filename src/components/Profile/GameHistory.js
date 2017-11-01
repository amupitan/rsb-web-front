import React from 'react';
import { Link } from 'react-router-dom';


const GameHistory = game => {

    return (
        <div className="col-sm-6 panel panel-default">
            <div className="panel-heading-rsb">
                <h2>Game History</h2>
            </div>
            {(game && Games(game)) || NoGame}
        </div>
    );
}

const Games = (games) => {
    /** If I do games.map, I get a games.map not a function error. 
     * That is because games is set to {0:{...}}. 
     * I need to extract the games, and I'm doing that by using the key to get the games.
     * From that array, I can map it. 
     */
    let extractedGames = [];
    for (let key in games) {
        let indivisualGame = games[key];
        extractedGames.push(indivisualGame);
    }

    return (
        <div className="scroll-info panel-body">
            {
                extractedGames.map((game, i) => {
                    const { name, sport, lat, lng } = game;
                    return (
                        <div key={i} className="populate-requests row">
                            <Link to={`/games`} key={i} >
                                <div className="col-sm-4 col-sm-pull">
                                    <span><b>{name}</b></span>
                                </div>
                                <div className="col-sm-4">
                                    <span>{lat} {lng}</span><br />
                                    <span>{sport}</span><br />
                                </div>
                            </Link>
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