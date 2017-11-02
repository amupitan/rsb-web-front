import React from 'react';
import Rater from '../ui/Rater/Rater';

export default function displayGames({ name, sport }, onchange, rate) {

    return (
        <tr>
            <td>{name}</td>
            <td>{sport}</td>
            <td>Haven't done this yet</td>
            <Rater rating={rate} onchange={onchange} />
        </tr>
    )
}

