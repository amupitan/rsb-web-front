import yoda from '../yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showInfo } from '../../mixins/notifiable';

const logoutMessage = 'You have successfully logged out';

export const _formElements = [
    {
        name: 'username',
        placeholder: 'ellenjohnson',
        type: 'text',
        validate: (value) => {
            if (value.length < 4 || value.length > 12) return 'Incorrect Length';
            return false;
        }
    },
    {
        name: 'password',
        placeholder: 'xxxxxxxxxx',
        type: 'password',
        validate: (value) => {
            if (value.length < 6 || value.length > 120) return 'Incorrect Length';
            return false;
        }
    },
];

async function _login(data) {
    const res = await yoda.login(data);
    if (res.error) {
        return _handleError(res.data)
    }

    return { data: '/', user: res.data };
};

function _handleError(error) {
    if (error.code === 9) {
        // user is already logged in
        return { data: '/', user: {} };
    }
    return { error: errorFormatter(error) };
}

export async function _logout(data) {
    await yoda.get('/logout', true);
    session.logOut();
    showInfo(logoutMessage);
    redirect({ path: '/login' });
};

export function _onLogin({ user }) {
    if (user.username) {
        session.user = user;
        session.setItem('username', user.username); // for backward compatibility DO NOT USE
    }
}

export default _login;