import constraints from "../constraints";
import Game, { getGamesNearLocation, _joinGame, _createGame, _leaveGame, joinAndGetGame } from './game';

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

export const joinGame = _joinGame;
export const createGame = _createGame;
export const leaveGame = _leaveGame;

export { getGamesNearLocation, joinAndGetGame as getGame };

export default Game;


