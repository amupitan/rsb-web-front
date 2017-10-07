import yoda from '../../lib/yoda';


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
    if (error.code === 7) {
        return { error: 'Invalid username/password' };
    } else if (error.code === 9) {
        // user is already logged in
        return { data: '/' };
    }
    return { error: 'Unexpected Error. Please try again later' };
}

export default _login;