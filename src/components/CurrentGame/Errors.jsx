import React from 'react';
import { Link } from "react-router-dom";

import hoops from '../../assets/hoop.gif';

export const ErrorPage = ({ message }) => (
    <div className='rsb-current-game-error-box'>
        <img src={hoops} alt='stick man throwing hoops' width={350} />
        <p className='rsb-current-game-error-message'>{message}</p>
        <Link to='/host'>
            <button className='rsb-current-game-error-button'><span>Host Game </span></button>
        </Link>
        <Link to='/join'>
            <button className='rsb-current-game-error-button'><span>Join Game </span></button>
        </Link>
    </div>
);

export const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="rsb-game-error text-center">
            <p className="h3">{message}</p>
        </div>
    );
};