import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { sports } from '../../lib/game';


// GameInfo is dislayed after a marker is clicked
const GameInfo = ({ name, agerange, duration, sport, startTime, host }) => {
    const age = (agerange && [...agerange]) || [0, 0];
    const time = (new Date(startTime)).toTimeString();
    const { firstname, lastname, username } = host || {};

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>Minimum Age:</strong>{age[0]} <strong>Maximum Age: </strong>{age[1]}</p>
            <p><strong>Start time: </strong>{time}</p>
            <p><strong>Sport: </strong>{sports[sport]} </p>
            <p><strong>Host: </strong>
                <Router>
                    <span className="">
                        <Link to={`/user/${username}`} >{firstname} {lastname}</Link>
                    </span>
                </Router>
            </p>
            <p><strong>Duration: </strong>{duration} minutes</p>
        </div >
    );
};

export default GameInfo;