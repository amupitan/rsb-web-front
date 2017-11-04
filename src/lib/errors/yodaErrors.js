import { deepFreeze } from '../utils';

const _invalidUsernamePassword = {
    'Invalid username': 'The username is invalid',
    'Passwords do not match': 'The passwords do not match',
    'Invalid password': 'The password does not match the requirements',
    'Invalid email': 'The email is invalid',
    'Invalid username or password': 'The username/password combination was not found',
    'Username already taken': 'The username is already taken',
}

const _yodaErrors = {
    7: _invalidUsernamePassword,
    10: {
        'User not logged in': 'Your session has timed out. Login to continue',
        '*': 'Your session has timed out. Login to continue',
    },
    30: { '*': 'You are not in a game' },
}

export default deepFreeze(_yodaErrors);