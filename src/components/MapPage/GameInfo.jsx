import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { sports } from '../../lib/game';

import Rater from '../ui/Rater';

// GameInfo is dislayed after a marker is clicked
const GameInfo = ({ name, agerange, duration, sport, startTime, host = {}, members }) => {
    const age = (agerange && [...agerange]) || [0, 0];
    const time = (new Date(startTime)).toTimeString();
    const { username, rating } = host;

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>Minimum Age:</strong>{age[0]} <strong>Maximum Age: </strong>{age[1]}</p>
            <p><strong>Start time: </strong>{time}</p>
            <p><strong>Sport: </strong>{sports[sport]} </p>
            <span><strong>Host: </strong></span>
            <div>
                <Router>
                    <div className="row">
                        <div className="col-xs-6 rsb-member-label">
                            <Link to={`/user/${username}`}>
                                <span className="label label-warning">{username}</span>
                            </Link>
                        </div>
                        <span className="col-xs-6">
                            <Rater rating={rating} />
                        </span>
                    </div>
                </Router>
            </div>
            <span><strong>Members: </strong></span>
            <MemberInfo members={members} />
            <p><strong>Duration: </strong>{duration} minutes</p>
        </div >
    );
};

const MemberInfo = ({ members }) => {
    if (!members) return null;
    return (
        <div>{
            members.map((mem, i) => {
                const memberName = mem.username;
                const memberRating = mem.rating;
                return (
                    <Router key={i}>
                        <div className="row">
                            <div className="col-xs-6 rsb-member-label">
                                <Link to={`/user/${memberName}`} >
                                    <span className="label label-warning">{memberName}</span>
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                <Rater rating={memberRating} />
                            </div>
                        </div>
                    </Router>
                );
            })
        }</div>
    );
};

export default GameInfo;