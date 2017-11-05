import React from 'react';
import Rater from '../ui/Rater/Rater';

export default function displayGames({ name, startTime }, onchange, rate) {

    return (
        <tr>
            <td>{name}</td>
            <td>{startTime.substring(0, startTime.indexOf('T'))}</td>
            <Rater rating={rate} onchange={onchange} />
        </tr>
    )
}

