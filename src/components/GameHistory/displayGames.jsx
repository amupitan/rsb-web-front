import React from 'react';
import Rater from '../ui/Rater/Rater';

export default function displayGames({ name, startTime, agerange }, onchange, rate) {

    return (
        <tr>
            <td>{name}</td>
            <td>{startTime.substring(0, startTime.indexOf('T'))}</td>
            <td>{agerange[0]}-{agerange[1]}</td>
            <Rater rating={rate} onchange={onchange} />
        </tr>
    )
}

