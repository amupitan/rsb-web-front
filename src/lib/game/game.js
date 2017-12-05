import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError, showInfo } from '../../mixins/notifiable';

//make request to get game
export async function getGame({ value } = {}) {
    const path = value ? `/game/g/${value}` : '/game';
    return await yoda.get(path, true);
}

function _handleError(error) {
    return { error: errorFormatter(error) };
}

// joins a game and returns it
export async function joinAndGetGame(game, byId) {
    const { mode, value } = byId ? { mode: 'i', value: game.id } : { mode: 'j', value: game.joincode };

    const res = await yoda.post(`/game/join/${mode}`, (new YodaRequest({}, {
        code: value,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}

/**
 * Leaves a game and returns a {message} if successful,
 * or an error if not
 */
export async function leaveGame() {
    const res = await yoda.post('/game/exit', (new YodaRequest({}, {})).toString(), true);
    session.removeItem('game');
    if (res.error) {
        return _handleError(res.data);
    }
    session.removeItem('game');
    return { message: 'You have successfully left the game' };
}

// gets games based on a location
export async function getGamesNearLocation({ lat, lng }) {
    const res = await yoda.get(`/games/l/lng/${lng}/lat/${lat}`, true);
    if (res.error) {
        const errorToDisplay = _handleError(res.data);
        showError(errorToDisplay.error);
        redirect();
        //TODO: no point returning error?
        // Right now the reason the error is returned is so map can have a custom handleError if it wants
        return errorToDisplay;
    }
    return res.data;
}

// joins a game based on map find or join code
export async function joinGame(game, { byId = true, source = '/' } = {}) {
    if (!game) return;
    const user = session.getItem('username'); //TODO: use navigator/history

    if (!user) {
        console.log('FATAL: no one is signed in');
        return redirect('/login', { info: 'You have to be signed in to join a game' });
    }

    const joinedGame = await joinAndGetGame(game, byId);
    if (joinedGame.error) {
        //TODO: notify user of error and redirect them somewhere
        console.log(joinedGame.error);
        redirect({ path: source });
        return joinedGame;
    }

    redirect({ path: '/game', state: { game: joinedGame } });
}

export async function createGame(data) {
    let res = await yoda.post('/create/game', (new YodaRequest({}, data)).toString(), true);
    if (res.error) {
        return _handleError(res.data)
    }

    res = await getGame({ value: res.data });
    if (res.error) {
        return _handleError(res.data)
    }

    redirect({ path: '/game', state: { game: res.data } });
};

export async function editGame(data) {
    const res = await yoda.post('/edit/game', (new YodaRequest({}, data)).toString(), true);
    if (res.error) {
        return _handleError(res.data)
    }

    return res.data;
};

// rates a game if not previously rated or returns an error
export async function rateGame({ rating, id }) {
    const res = await yoda.post('/game/rate', (new YodaRequest({}, {
        code: id,
        rating: rating,
    })).toString(), true);

    if (res.error) {
        return _handleError(res.data)
    }
    return res.data
}

export async function sendGameInvite(username) {
    const res = await yoda.post('/invite/m/send/t/1', (new YodaRequest({}, {
        to: username,
    })).toString(), true);

    if (res.error) {
        return _handleError(res.data);
    }
    showInfo("Successfully sent invitation");
    return res.data;
}

export async function reviewGameInvite({ accept, id, from }) {
    const res = await yoda.post('/invite/m/review/t/1', (new YodaRequest({}, {
        accept,
        from,
        game: id,

    })).toString(), true);

    if (res.error) {
        return _handleError(res.data);
    }

    return res.data;
}

// Returns the user's current game or an error if there's no game
export default async function Game() {
    const game = await getGame();
    if (game.error) {
        return _handleError(game.data);
    }

    return game.data;
}
