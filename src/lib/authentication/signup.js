import yoda from '../../lib/yoda';
import redirect from '../../lib/navigator';
import errorFormatter from '../../lib/errors';

const onSignupAlert = 'You have successfully signed up. Don\'t forget to confirm your email';

export const _formElements = [
    [
        {
            name: 'firstname',
            placeholder: 'Ellen',
            type: 'text',
        },
        {
            name: 'lastname',
            placeholder: 'Johnson',
            type: 'text',
        },
    ],
    {
        name: 'username',
        placeholder: 'ellenjohnson',
        type: 'text',
        validate: (value) => {
            if (value.length < 4 || value.length > 10) return 'Incorrect Length';
            return false;
        }
    },
    [
        {
            name: 'password',
            placeholder: 'xxxxxxxxxx',
            type: 'password',
            validate: (value) => {
                if (value.length < 6 || value.length > 120) return 'Incorrect Length';
                return false;
            }
        },
        {
            name: 'confirmPass',
            title: 'Confirm Password',
            placeholder: 'xxxxxxxxxx',
            type: 'password',
            validate: (value) => {
                if (value.length < 6 || value.length > 120) return 'Incorrect Length';
                return false;
            }
        },
    ],
    {
        name: 'email',
        placeholder: 'xxx@xxx.com',
        type: 'email',
        validate: (value) => {
            if (value.length < 6 || value.length > 120) return 'Incorrect Length';
            return false;
        },
    },
    [
        {
            name: 'city',
            placeholder: 'your city',
            type: 'text',
            validate: (value) => {
                if (value.length < 2 || value.length > 50) return 'Incorrect Length';
                return false;
            },
        },
        {
            name: 'dob',
            title: 'Date of Birth',
            type: 'date',
            placeholder: 'MM-DD-YYYY',
            validate: (value) => {
                if (value.length !== 10) return 'Invalid Date of Birth';
                return false;
            },
        },
    ]
];

async function _signup(data) {
    const res = await yoda.signup(data);
    if (res.error) {
        return _handleError(res.data)
    }
    return { data: '/login' };

};

function _handleError(error) {
    return { error: errorFormatter(error) };
}

export async function _logout(data) {
    await yoda.get('/logout');
    redirect({ path: '/login', state: { logout: true } });
};

export function _onSignup({ username }) {
    redirect({ path: '/login', state: { info: onSignupAlert, username: username } });
}

export default _signup;