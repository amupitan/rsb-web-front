import React from 'react';
import { getUser, getHeading, getFriends, getGameHistory } from './controller';
import './style.css';

function ViewUser(props) {
    let userInstance = {};
    let returnable;
    try{
         userInstance = getUser(props.match.params.username);
        returnable = (
            <div className="panel col-xs-10 col-xs-offset-1">
            {getHeading(userInstance)}
            <div className="row">
                {getFriends(userInstance)}
                {getGameHistory(userInstance)}
            </div>
        </div >
        )
    } catch(e){
        returnable = (<h3>Invalid user or some sh*t like that</h3>)
    }

    return returnable;
}

export default ViewUser
