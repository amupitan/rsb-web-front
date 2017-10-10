import session from '../session';
import _getGame, { _getGamesNearLocation, _joinGame } from './game';
// const Game = session.getItem('game');

export const sports = [
    'soccer',
    'baskeball',
    'volleyball',
    'baseball',
    'frisbee',
    'frisbee',
];

export const getGame = _getGame;
export const getGamesNearLocation = _getGamesNearLocation;
export const joinGame = _joinGame;

// TODO: I think the function is very bad. Look for a better way to write it
export default async function () {
    while (!session.getItem('game'));
    // setTimeout(function () {
    //     //your code here...
    // }, 1000);
    return Promise.resolve(session.getItem('game'));
}


