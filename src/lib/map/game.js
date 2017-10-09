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

async function _joinGame(game, user) {
    return await yoda.post('/game/join/i', (new YodaRequest({}, {
        code: game.id,
    })).toString(), true);
}

function _handleError(error) {
    return { error: errorFormatter(error) };
}

export default async function (game, user) {
    const res = await _joinGame(game, user);

    if (res.error) {
        return _handleError(res.data)
    }
    return res.data;
}
