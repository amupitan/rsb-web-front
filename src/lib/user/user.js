import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError } from '../../mixins/notifiable';

export const FriendStatus = {
    NONE: '',
    IS_USER: 'isUser',
    ARE_FRIENDS: 'areFriends',
    SENT_R: 'sentRequest',
    RECEIVED_R: 'receivedRequest',
}

function _handleError(error) {
    const err = { error: errorFormatter(error) }
    showError({ message: err.error });
    redirect();
    return err;
}

export function _getLoggedInUserName() {
    return session.getItem('username');
}

export default async function _getUserInfo({ username, populate = '0' } = {}) {
    const res = await yoda.post(`/user/p/${populate}`, (new YodaRequest({}, {
        username: username,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function _getUserFriends(username) {
    const res = await yoda.post('/user/f/1', (new YodaRequest({}, {
        username: username,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function removeFriend({ username }) {
    const res = await yoda.post('/remove/f', (new YodaRequest({}, {
        "unfriend": username,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function reviewFriendRequest({ username, accept }) {
    console.log(username + " " + accept);
    const res = await yoda.post('/invite/m/review/t/0', (new YodaRequest({}, {
        'from': username,
        'accept': accept,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function sendFriendRequest({ username }) {
    const res = await yoda.post('/invite/m/send/t/0', (new YodaRequest({}, {
        to: username,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;

}

export async function uploadProfilePhoto(file) {
    const res = await yoda.postFile('/upload', file, { isRelative: true });
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function _getGameHistory(username) {
    let res = await yoda.post('/user/pg', (new YodaRequest({}, username)).toString(), true);
    if (res.error) {
        // return _handleError(res.data)
        console.log("error");
    }

    console.log(res);
    // return res;
    //TODO get backend info to get this doooone
    return {
        res: [{
            name: "Game Name",
            // startTime: (new Date(1 + ":" + 0)).toISOString(),
            // endTime: (new Date(2 + ":" + 0)).toISOString(),
            sport: "soccer",
            maxAge: 12,
            minAge: 14,
            lat: 42,
            lng: -93.5,
            rating: 0
        }, {
            name: "Anotha game",
            // startTime: (new Date(1 + ":" + 0)).toISOString(),
            // endTime: (new Date(2 + ":" + 0)).toISOString(),
            sport: "basketball",
            maxAge: 12,
            minAge: 14,
            lat: 42,
            lng: -93.5,
            rating: 0
        }]
    }
}