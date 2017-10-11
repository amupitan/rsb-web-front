import session from '../session';
import _joinAndGetGame, { _getGamesNearLocation, _joinGame, _createGame } from './game';
// const Game = session.getItem('game');

//TODO: add real duration
const _sports = {
    'soccer': { duration: 90 },
    'baskeball': { duration: 90 },
    'volleyball': { duration: 90 },
    'baseball': { duration: 90 },
    'frisbee': { duration: 90 },
    'discgolf': { duration: 90 },
};

export const sports = Object.freeze(Object.keys(_sports));

export const getDuration = (sport) => _sports[sport].duration;

export const getGame = _joinAndGetGame;
export const getGamesNearLocation = _getGamesNearLocation;
export const joinGame = _joinGame;
export const createGame = _createGame;

// TODO: I think the function is very bad. Look for a better way to write it
export default async function () {
    while (!session.getItem('game'));
    // setTimeout(function () {
    //     //your code here...
    // }, 1000);
    return Promise.resolve(session.getItem('game'));
}


