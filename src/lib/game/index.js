import session from '../session';
import yoda, { YodaRequest } from '../yoda/yoda';

// const Game = session.getItem('game');


// TODO: I think the function is very bad. Look for a better way to write it
export default async function () {
    while (!session.getItem('game'));
    // setTimeout(function () {
    //     //your code here...
    // }, 1000);
    return Promise.resolve(session.getItem('game'));
}

export async function createGame(joincode) {
    return await yoda.post('/game/join/i', (new YodaRequest({}, {
        code: joincode,
    })).toString(), true);
}