import dummy from '../../dummy/allUsers';
import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError } from '../../mixins/notifiable';

function _handleError(error) {
    return { error: errorFormatter(error) };
}

export function _name() {
    return session.getItem('username');
}

export async function _getUserInfo(username) {
    const res = await yoda.post('/user/p/0', (new YodaRequest({}, {
        username: username,
    })).toString(), true);
    if (res.error) {
        const err = _handleError(res.data);
        showError({ message: err.error });
        redirect();
    }
    const u = session.getItem("username");
    redirect({ path: `/user/${u}` });  //TODO: This shouldn't be necessary if the path in Home/view sends them there
    return res.data;
}

export async function _getUserFriends(username) {
    const res = await yoda.post('/user/f/1', (new YodaRequest({}, {
        username: username,
    })).toString(), true);
    if (res.error) {
        const err = _handleError(res.data);
        showError({ message: err.error });
        redirect();
    }
    return res.data;
}

export default _getUserInfo;