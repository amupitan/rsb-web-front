import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError } from '../../mixins/notifiable';

export const FriendStatus = {
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

export async function _removeFriend(username) {
    const res = await yoda.post('/remove/f', (new YodaRequest({}, {
        "unfriend": username,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function _handleFriendRequest(username, acceptStatus) {
    console.log(username + " " + acceptStatus);
    const res = await yoda.post('/invite/m/review/t/0', (new YodaRequest({}, {
        "from": username,
        "accept": acceptStatus,
    })).toString(), true);
    if (res.error) {
        return _handleError(res.data);
    }
    return res.data;
}

export async function _sendFriendRequest(username) {
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

