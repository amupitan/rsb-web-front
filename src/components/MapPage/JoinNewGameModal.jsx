import React from 'react';

const JoinNewGameModal = ({ onCancel, onJoin }) => {
    return (
        <div className="rsb-join-new-game-modal">
            <div className="rsb-join-modal-content">
                <p>Are you sure you want to join this game and leave your current game?</p>
                <button className="btn btn-success rsb-modal-join" onClick={onJoin}>Join Game</button>
                <button className="btn btn-warning rsb-modal-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default JoinNewGameModal;