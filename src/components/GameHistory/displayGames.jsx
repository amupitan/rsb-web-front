import React from 'react';
import Rater from '../ui/Rater/Rater';

import './style.css';

const DisplayGames = ({ name, startTime, agerange, handleChange, rate, i }) => {
    return (
        <tr className={'col' + (i % 2)}>
            <td>{name}</td>
            <td>{startTime.substring(0, startTime.indexOf('T'))}</td>
            <td>{agerange[0]}-{agerange[1]}</td>
            <Rater rating={rate} handleChange={handleChange} />
        </tr>
    )
}

export default DisplayGames;
