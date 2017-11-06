import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { sports } from '../../lib/game';

import { getStars } from '../ui/Rater/Rater';

// GameInfo is dislayed after a marker is clicked
const GameInfo = ({ name, agerange, duration, sport, startTime, host, members }) => {
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
                        <Link to={`/user/${username}`} >{username}</Link>
                    </span>
                </Router>
            </p>
            <span><strong>Members: </strong></span>
            <MemberInfo members={members} />
            <p><strong>Duration: </strong>{duration} minutes</p>
        </div>
    );
};

const MemberInfo = ({ members }) => {
    if (!members) return null;

    return (
        <div>{
            members.map((mem, i) => {
                const memberName = mem.username;
                const memberRating = mem.rating;
                let ratingDiv = <span><strong>No Ratings</strong></span>
                if (memberRating) {
                    <span>{getStars(memberRating)}</span>
                }

                return (
                    <Router key={i}>
                        <div key={i}>
                            <Link to={`/user/${memberName}`} key={i} >
                                <button className="btn btn-link" key={i}>{memberName}</button>
                            </Link>
                            {ratingDiv}
                        </div>
                    </Router>
                );
            })
        }</div>
    );
};

export default GameInfo;