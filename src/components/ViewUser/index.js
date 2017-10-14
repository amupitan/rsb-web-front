import React from 'react';
import { getUser, getHeading, getFriends, getGameHistory } from './controller';
import './style.css';

function ViewUser(props) {
    const userInstance = getUser(props.match.params.username);

    return (
        <div className="panel col-xs-10 col-xs-offset-1">
            {getHeading(userInstance)}
            <div className="row">
                {getFriends(userInstance)}
                {getGameHistory(userInstance)}
            </div>
        </div >
    )
}

export default ViewUser
