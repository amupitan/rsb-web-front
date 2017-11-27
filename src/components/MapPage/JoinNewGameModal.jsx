import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';


const JoinNewGameModal = ({ onClose, joinGame }) => {
    return (
        <div className="rsb-join-new-game-modal">
            <div className="rsb-join-modal-content">
                <p>Are you sure you want to join this game and leave your current game?</p>
                <Router>
                    <span>
                        <Link to={`/game`}>
                            <button className="btn btn-success rsb-modal-join" onClick={joinGame}>Join Game</button>
                        </Link>
                    </span>
                </Router>
                <button className="btn btn-warning rsb-modal-cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default JoinNewGameModal;