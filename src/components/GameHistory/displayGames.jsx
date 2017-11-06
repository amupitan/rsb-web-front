import React from 'react';
import PropTypes from 'prop-types';

import Rater from '../ui/Rater';

import './style.css';

const DisplayGames = ({ id, name, startTime, agerange, onRatingChange, rating, index }) => {
    const handleRatingChange = (gameId) => {
        return (rating) => onRatingChange({ rating, id: gameId });
    }

    return (
        <tr className={'col' + (index % 2)}>
            <td>{name}</td>
            <td>{startTime.substring(0, startTime.indexOf('T'))}</td>
            <td>{agerange[0]}-{agerange[1]}</td>
            <Rater rating={rating} onChange={handleRatingChange(id)} />
        </tr>
    )
}

DisplayGames.defaultProps = {
    rating: 0,
}

DisplayGames.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    agerange: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRatingChange: PropTypes.func.isRequired,
}

export default DisplayGames;
