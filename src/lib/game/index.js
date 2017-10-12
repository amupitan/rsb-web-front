import session from '../session';
import _joinAndGetGame, { _getGamesNearLocation, _joinGame, _createGame } from './game';
import constraints from "../constraints";

const DURATION = constraints.GameDuration;
const _sports = {
    'soccer': { duration: DURATION.SOCCER },
    'baskeball': { duration: DURATION.BASKETBALL },
    'volleyball': { duration: DURATION.VOLLEYBALL },
    'baseball': { duration: DURATION.OTHERS },
    'frisbee': { duration: DURATION.OTHERS },
    'discgolf': { duration: DURATION.OTHERS },
};

export const sports = Object.freeze(Object.keys(_sports));

export const getDuration = (sport) => _sports[sport].duration;

export const getGame = _joinAndGetGame;
export const getGamesNearLocation = _getGamesNearLocation;
export const joinGame = _joinGame;
export const createGame = _createGame;

// Returns the current game wrapped in Promise or an error if there is no current game
export default async function () {
    return new Promise((resolve, reject) => {
        let timeTaken = 0;

        const id = window.setInterval(() => {
            try {
                timeTaken += 100;

                // send game if it has been set by the session
                if (session.getItem('game')) {
                    window.clearInterval(id);
                    resolve(session.getItem('game'));

                    // throw error if it takes too long for session to set game
                } else if (timeTaken === 2000) {
                    throw new Error('Game timed out. Session took too long to set game or did not set. The user is probably not in a game');
                }
            } catch (err) {

                //catch error and return it as Promise.reject
                window.clearInterval(id);
                reject(err);
            }
        }, 100);
    });
}


