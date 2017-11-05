import React from 'react';
import Rater from '../ui/Rater/Rater';

import './style.css';

export default function displayGames({ name, startTime, agerange }, onchange, rate, i) {
    return (
        <tr key={i} className={'col' + (i % 2)}>
            <td>{name}</td>
            <td>{startTime.substring(0, startTime.indexOf('T'))}</td>
            <td>{agerange[0]}-{agerange[1]}</td>
            <Rater rating={rate} onchange={onchange} />
        </tr>
    )
}

