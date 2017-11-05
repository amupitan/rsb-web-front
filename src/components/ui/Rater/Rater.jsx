import React from 'react';

import './style.css';

const Rater = ({ rating, onChange }) => {
    return (
        <td>
            {getStars(rating, onChange)}
        </td>
    )
}

function getStars(numStars, onChange) {
    let stars = []
    for (let i = 0; i < 5; i++) {
        let starColor = (numStars !== 0) ? ((numStars > i) ? "rsb-ui-rater-checked" : "") : "rsb-ui-rater-unrated";
        stars[i] = (<span key={i} onClick={() => { onChange(i + 1) }} className={`fa fa-star ${starColor}`}></span>)
    }
    return stars;
}

export default Rater;