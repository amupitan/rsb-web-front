import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '..//navigator';
import session from '../session';
import errorFormatter from '../errors';

//make request to join/get game
async function _joinAndGetGame({ mode, value }) {
    return await yoda.post(`/game/join/${mode}`, (new YodaRequest({}, {
        code: value,
    })).toString(), true);
}

function _handleError(error) {
    return { error: errorFormatter(error) };
}

// joins a game and returns it
async function _getGame(game, byId) {
    const { mode, value } = byId ? { mode: 'i', value: game.id } : { mode: 'j', value: game.joincode };

    const res = await _joinAndGetGame({ mode: mode, value: value });
    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}

// gets games based on a location
export async function _getGamesNearLocation({ lat, lng }) {
    const res = await yoda.get(`/games/l/lng/${lng}/lat/${lat}`, true);
    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}

// joins a game based on map find or join code
export async function _joinGame(game, { byId = true, source = '/' }) {
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
}

export default _getGame;
