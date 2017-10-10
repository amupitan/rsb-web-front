import yoda from '../../lib/yoda';
import { YodaRequest } from '../../lib/yoda/yoda';
import errorFormatter from '../../lib/errors';

export const _sports = [
    'soccer',
    'baskeball',
    'volleyball',
    'baseball',
    'frisbee',
    'frisbee',
];

async function _joinGame({ mode, value }) {
    return await yoda.post(`/game/join/${mode}`, (new YodaRequest({}, {
        code: value,
    })).toString(), true);
}

function _handleError(error) {
    return { error: errorFormatter(error) };
}

async function _getGame(game, byId) {
    const { mode, value } = byId ? { mode: 'i', value: game.id } : { mode: 'j', value: game.joincode };

    const res = await _joinGame({ mode: mode, value: value });
    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}

export default _getGame;
