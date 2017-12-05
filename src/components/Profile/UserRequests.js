import React from 'react';
import { Link } from 'react-router-dom';

import { sports } from '../../lib/game'
import { DateUtils } from '../../lib/utils';

import RSBButton from '../ui/RSBButton';
import Avatar from '../ui/Avatar';

const UserRequests = ({ requests, onReview }) => {
    return (
        <div>
            {
                requests.map((request, i) => {
                    const { username, firstname, avatar, time, } = request;

                    return (
                        <div key={i} className="populate-requests requests-space row">
                            <Link to={`/user/${username}`} key={i} >
                                <div className="col-sm-2 col-sm-pull">
                                    <Avatar avatar={avatar} alt='profile-pic' className='profile-pic-xs' />
                                </div>
                                <div className="col-sm-6 display-request-info">
                                    <b>Username:</b> {username}<br />
                                    <b>First name:</b> {firstname}
                                    {time}
                                </div>
                            </Link>
                            <ReviewRequest accept onClick={onReview} username={username} />
                            <ReviewRequest onClick={onReview} username={username} />
                        </div>
                    );
                })
            }
        </div>
    );

}

export const GameRequest = ({ requests, onReview, games }) => {
    return (<div>
        {
            requests.map((request, i) => {
                const { from, game } = request;

                return (
                    <div key={i} className="populate-requests requests-space row">
                        {/*TODO: Display better information*/}
                        <div className="row">
                            <p className="col-xs-4 display-request-info">
                                From: {from}<br />
                            </p>
                            <p className="col-xs-4 display-request-info"> Game Name: {games[i].name}</p>
                            <div className="col-xs-4 pull-right">
                                <ReviewRequest accept onClick={onReview} id={game} username={from} className="rsb-accept-game-request-btn" />
                                <ReviewRequest onClick={onReview} id={game} username={from} className="rsb-decline-game-request-btn" />
                            </div>
                        </div>
                        <div className="row">
                            <p className="col-xs-11 display-request-info"> {DateUtils.getReadableTime(games[i].startTime)}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-11 display-request-info"> Location: {games[i].street}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-11 display-request-info"> Sport: {sports[games[i].sport]}</p>
                        </div>
                    </div>
                );
            })
        }
    </div>)
}

const ReviewRequest = ({ accept = false, onClick, username, id }) => {
    const { glyph, className } = accept ?
        { glyph: 'ok', className: 'accept' } :
        { glyph: 'remove', className: 'decline' };

    return (
        <div className="display-request-info">
            <RSBButton
                glyphicons={`glyphicon glyphicon-${glyph}`}
                className={`${className} pull-right`}
                onClickFunction={() => onClick({ accept, username, id })}
            />
        </div>
    );
}

export default UserRequests;