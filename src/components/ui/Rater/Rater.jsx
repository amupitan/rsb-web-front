import React from 'react';

import './style.css';

const Rater = ({ rating, handleChange }) => {
    return (
        <td>
            {getStars(rating, handleChange)}
        </td>
    )
}

function getStars(numStars, handleChange) {
    let stars = []
    for (let i = 0; i < 5; i++) {
        let starColor = (numStars !== 0) ? ((numStars > i) ? "rsb-ui-rater-checked" : "") : "rsb-ui-rater-unrated";
        stars[i] = (<span key={i} onClick={() => { handleChange(i + 1) }} className={`fa fa-star ${starColor}`}></span>)
    }
    return stars;
}

export default Rater;