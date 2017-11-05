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
    let res = await yoda.post('/user/pg/0', (new YodaRequest({}, {
        username: username,
    })).toString(), true);

    if (res.error) {
        return _handleError(res.data)
    }
    return res.data
}