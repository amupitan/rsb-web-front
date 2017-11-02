import React from 'react';
import Rater from '../ui/Rater/Rater';

export default function displayGames({ name, sport }, onchange) {

    return (
        <tr>
            <td>{name}</td>
            <td>{sport}</td>
            <Rater rating={4} onchange={onchange} />
        </tr>
    )
}

