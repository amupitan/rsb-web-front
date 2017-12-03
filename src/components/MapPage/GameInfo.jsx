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
        <Router>
            <div>
                <h1>{name}</h1>
                <p><strong>Minimum Age:</strong>{age[0]} <strong>Maximum Age: </strong>{age[1]}</p>
                <p><strong>Start time: </strong>{time}</p>
                <p><strong>Sport: </strong>{sports[sport]} </p>
                <span><strong>Host: </strong></span>
                <div>
                    <div className="row">
                        <div className="col-xs-6 rsb-member-label">
                            <Link to={`/user/${username}`}>
                                <span className="label label-warning">{username}</span>
                            </Link>
                        </div>
                        <span className="col-xs-6">
                            <StarRating {...{ rating }} />
                        </span>
                    </div>
                </div>
                <span><strong>Members: </strong></span>
                <MemberInfo members={members} />
                <p><strong>Duration: </strong>{duration} minutes</p>
            </div>
        </Router >
    );
};

const MemberInfo = ({ members }) => {
    if (!members) return null;
    return (
        <div>{
            members.map((member, i) => {
                const { username, rating } = member;
                return (
                    <div className="row" key={i}>
                        <div className="col-xs-6 rsb-member-label">
                            <Link to={`/user/${username}`} >
                                <span className="label label-warning">{username}</span>
                            </Link>
                        </div>
                        <div className="col-xs-6">
                            <StarRating {...{ rating }} />
                        </div>
                    </div>
                );
            })
        }</div>
    );
};

const StarRating = ({ rating }) => {
    return (<span> {rating ? < Rater {...{ rating }} /> : <strong>No Ratings</strong>} </span>);
}

export default GameInfo;