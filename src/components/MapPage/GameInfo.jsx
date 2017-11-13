import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { sports } from '../../lib/game';

import { getStars } from '../ui/Rater';

// GameInfo is dislayed after a marker is clicked
const GameInfo = ({ name, agerange, duration, sport, startTime, host, members }) => {
    const age = (agerange && [...agerange]) || [0, 0];
    const time = (new Date(startTime)).toTimeString();
    const { username } = host || {};

    let ratingDiv = <span><strong>No Ratings</strong></span>
    if (host && host.rating) {
        ratingDiv = <span>{getStars(host.rating)}</span>
    }

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
                            {ratingDiv}
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
                const memberRating = mem.ratring;
                let ratingDiv = <span><strong>No Ratings</strong></span>
                if (memberRating) {
                    ratingDiv = <span>{getStars(memberRating)}</span>
                }

                return (
                    <Router key={i}>
                        <div key={i} className="row">
                            <div className="col-xs-6 rsb-member-label">
                                <Link to={`/user/${memberName}`} key={i} >
                                    <span className="label label-warning" key={i}>{memberName}</span>
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                {ratingDiv}
                            </div>
                        </div>
                    </Router>
                );
            })
        }</div>
    );
};

export default GameInfo;