import React from 'react';
import { Link } from 'react-router-dom';


const GameHistory = ({ games, username }) => {
    return (
        <div className="col-sm-6 panel panel-default rsb-profile-panel">
            <div className="panel-heading-rsb">
                <h2>Game History</h2>
            </div>
            {(games && <Games games={games} username={username} />) || NoGame}
        </div>
    );
}

const Games = ({ games, username }) => {
    return (
        <div className="scroll-info panel-body">
            {
                Object.entries(games).map((game, i) => {
                    const { name, startTime } = game[1];
                    return (
                        <div key={i} className="populate-requests row">
                            <Link to={`/history/${username}`} >
                                <div className="col-sm-6 ">
                                    {name}
                                </div>
                                <div className="col-sm-6 ">
                                    {startTime.substring(0, startTime.indexOf('T'))}
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