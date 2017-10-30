import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError } from '../../mixins/notifiable';

function _handleError(error) {
    const err = { error: errorFormatter(error) }
    showError({ message: err.error });
    redirect();
    return err;
}

export function _getLoggedInUserName() {
    return session.getItem('username');
}

export default async function _getUserInfo(username, { populate = '0' } = {}) {
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

export async function _handleImageChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
        console.log("Loaded!");
        console.log(reader);
        //Upload to file
    }

    reader.readAsDataURL(file)
}