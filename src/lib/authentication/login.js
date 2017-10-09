import yoda from '../../lib/yoda';
import redirect from '../../lib/navigator';
import errorFormatter from '../../lib/errors';

const logoutMessage = 'You have successfully logged out';

export const _formElements = [
    {
        name: 'username',
        placeholder: 'ellenjohnson',
        type: 'text',
        validate: (value) => {
            if (value.length < 4 || value.length > 10) return 'Incorrect Length';
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
    return { data: '/' };

};

function _handleError(error) {
    if (error.code === 9) {
        // user is already logged in
        return { data: '/' };
    }
    return { error: errorFormatter(error) };
}

export async function _logout(data) {
    await yoda.get('/logout');
    redirect({ path: '/login', state: { info: logoutMessage } });
};

export function _onLogin(newPath) {
    redirect({ path: newPath });
}

export default _login;