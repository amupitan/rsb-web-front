import React from 'react';

export default function displayGames({ name, sport }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{sport}</td>
        </tr>
    )
}