import React from 'react';
import { Link } from "react-router-dom";

import utils, { DateUtils } from '../../lib/utils';
import { sports } from '../../lib/game';

import Avatar from '../ui/Avatar';
import Loader from '../ui/Loader';


export const GameInfoRight = ({ minAge, maxAge, startTime, duration }) => (
    <div className="rsb-game-info-right col-sm-4">
        <p className="lead">
            <strong>Duration: </strong>{DateUtils.getCurrentTime(startTime)} - {DateUtils.getTimeAfter(({ dateString: startTime, minutes: duration }))}
        </p>
        <p className="lead"> <strong>Current Time: </strong>{DateUtils.getCurrentTime()}</p>
        <p className="lead">{DateUtils.toDateString()}</p>
        <br />
        <p className="lead"> <strong>Age Requirements: </strong> {minAge} - {maxAge} years</p>
    </div>
);

export const GameInfoCenter = ({ name, sport, address, host, joincode }) => {
    // TODO: link map icon to that location on the map
    const streetAddress = address ? <p className="lead">{address}&nbsp;
    <i className="fa fa-map" title="Show me in maps" aria-hidden="true"></i>
    </p> : <Loader width={30} height={30} thickness={6} />;

    // TODO: font awesome only has a soccer icon so we have to look for another source for sport icons
    const sportName = sports[sport],
        sportIcon = {
            'soccer': 'futbol-o',
            'basketball': 'dribbble',
        }[sportName] || 'futbol-o';

    return (
        <div className="rsb-game-info-center col-sm-4">
            <div className="text-center">
                <h1 className="rsb-game-name">{utils.toTitleCase(name)}</h1>
                <p className="h2"> <i className={`fa fa-${sportIcon}`} aria-hidden="true"></i>&nbsp;
                    {utils.toTitleCase(sports[sport])} Game</p>

                {streetAddress}
                <p className="lead"><strong>Join Code: </strong>{joincode || 'Hidden (This game is private)'}</p>

                <p className="lead"><strong>Host: </strong></p>
                <Link to={`/user/${host.username}`}>
                    <Avatar avatar={host.avatar} alt='member-profile-pic' className='rsb-game-host-photo' />
                    <p className="h4">{host.firstname} {host.lastname}</p>
                </Link>
            </div>
        </div>
    );
}

export const GameInfoLeft = ({ weather, distance }) => {
    if (!weather || !distance) {
        return (
            <div className="rsb-game-info-left col-sm-4 text-center">
                <Loader width={30} height={30} thickness={6} className={'rsb-game-mini-loader'} />
            </div>
        );
    }

    const icon = {
        'sunny': 'sun-o',
        'snow': 'snowflake-o',
        'clouds': 'cloud',
        'clear': 'cloud',
        'rain': 'bolt',
        'haze': 'tint',
        '': '',
    }[weather.weather];

    const distanceMessage = distance.toFixed(1) === '0.0' ? 'You are here!' : (`${distance.toFixed(1)} mile${distance !== 1 ? 's' : ''} away. Need a ride?`);
    return (
        <div className="rsb-game-info-left col-sm-4">
            <p className="lead"><strong>Temperature: </strong>&nbsp;{weather.temp}&#x2109;&nbsp;&nbsp;
            <i className={`fa fa-${icon} rsb-game-${weather.weather}`} aria-hidden="true"></i>
                <br /> {distanceMessage}</p>
        </div>
    );
}