import yoda from '../../lib/yoda';
import redirect from '../../lib/navigator';
import session from '../../lib/session';
import errorFormatter from '../../lib/errors';
import _getGame, { _sports } from './game';

export const sports = _sports;

export async function getCurrentLocation() {
    let position = {};
    try {
        const { coords } = await _getCurrentLocation();
        position = {
            lat: coords.latitude,
            lng: coords.longitude,
        }
    } catch (err) {
        position = Promise.resolve({ lat: 42.41315919699359, lng: -92.42620756015623 });

        // if err.code === 1 that means the user refused to let us get their location
        if (err.code === 1) {
            //notify the user that we need their location
        } else {
            //TODO: log the unknown error   
        }
    }

    return position;
}

const _getCurrentLocation = () => {
    return new Promise(function (resolve, reject) {
        //TODO: check if browser supports navigator.geolocation
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export async function getGames({ lat, lng }) {
    const res = await yoda.get(`/games/l/lng/${lng}/lat/${lat}`, true);
    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}

export async function joinGame(game, { byId = true, source = '/' }) {
    if (!game) return;
    const user = session.getItem('username'); //TODO: use navigator/history

    if (!user) {
        console.log('FATAL: no one is signed in');
        return redirect('/login', { info: 'You have to be signed in to join a game' });
    }

    const joinedGame = await _getGame(game, byId);
    if (joinedGame.error) {
        //TODO: notify user of error and redirect them somewhere
        console.log(joinedGame.error);
        redirect({ path: source });
        return joinedGame;
    }

    redirect({ path: '/game', state: { game: joinedGame } });
    console.log("handle the user joining the game " + game.id);
}

function _handleError(error) {
    return { error: errorFormatter(error) };
}