import constraints from "../constraints";
import Game, {
    getGamesNearLocation,
    joinGame,
    createGame,
    leaveGame,
    joinAndGetGame,
    getGameHistory,
    rateGame,
} from './game';

const DURATION = constraints.GameDuration;
const _sports = {
    'soccer': { duration: DURATION.SOCCER },
    'basketball': { duration: DURATION.BASKETBALL },
    'volleyball': { duration: DURATION.VOLLEYBALL },
    'baseball': { duration: DURATION.OTHERS },
    'frisbee': { duration: DURATION.OTHERS },
    'discgolf': { duration: DURATION.OTHERS },
};

export const sports = Object.freeze(Object.keys(_sports));

export const getDuration = (sport) => _sports[sport].duration;

export {
    getGamesNearLocation,
    joinAndGetGame as getGame,
    getGameHistory,
    createGame,
    rateGame,
    joinGame,
    leaveGame,
};

export default Game;


