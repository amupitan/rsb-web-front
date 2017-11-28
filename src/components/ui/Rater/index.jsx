import React from 'react';

import './style.css';

const Rater = ({ rating, onChange = () => { } }) => {
    return (
        getStars(rating, onChange)
    )
}

const getStars = (numStars, handleChange) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const starColor = (numStars !== 0) ? ((numStars > i) ? "rsb-ui-rater-checked" : "") : "rsb-ui-rater-unrated";
        stars[i] = (<span key={i} onClick={() => { handleChange(i + 1) }} className={`fa fa-star ${starColor}`}></span>)
    }

    return <div>{stars}</div>;
}

export default Rater;