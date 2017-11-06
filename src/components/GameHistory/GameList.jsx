import React from 'react';
import PropTypes from 'prop-types';

import Rater from '../ui/Rater';

import './style.css';

const GameList = ({ id, name, startTime, agerange, onRatingChange, rating, index }) => {
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

GameList.defaultProps = {
    rating: 0,
}

GameList.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    agerange: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRatingChange: PropTypes.func.isRequired,
}

export default GameList;
