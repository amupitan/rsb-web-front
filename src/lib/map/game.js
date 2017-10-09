import yoda from '../../lib/yoda';
import { YodaRequest } from '../../lib/yoda/yoda';
import errorFormatter from '../../lib/errors';
import mockServer from '../../dummy';

export const _sports = [
    'soccer',
    'baskeball',
    'volleyball',
    'baseball',
    'frisbee',
    'frisbee',
];

async function _joinGame(game, user) {
    // return await yoda.post('/game/join/i', (new YodaRequest({}, {
    //     id: game.id,
    // })).toString(), true);
    return await (async function () {
        return mockServer('/game/join/i')
    })();
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
