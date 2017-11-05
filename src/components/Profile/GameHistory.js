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
    return (
        <div className="scroll-info panel-body">
            {
                Object.entries(games).map((game, i) => {
                    const { name, startTime } = game[1];
                    return (
                        <div key={i} className="populate-requests row">
                            <Link to={`/history`} key={i} >
                                <div className="col-sm-4 col-sm-pull">
                                    <span><b>{name}</b></span>
                                </div>
                                <div className="col-sm-4">
                                    <span>{startTime.substring(0, startTime.indexOf('T'))}</span><br />
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