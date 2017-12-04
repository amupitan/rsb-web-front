import { deepFreeze } from '../utils';

const _invalidUsernamePassword = {
    'Invalid username': 'The username is invalid',
    'Passwords do not match': 'The passwords do not match',
    'Invalid password': 'The password does not match the requirements',
    'Invalid email': 'The email is invalid',
    'Invalid username or password': 'The username/password combination was not found',
    'Username already taken': 'The username is already taken',
    'The password doesn\'t match our records': 'The password doesn\'t match our records. Please type your current password',
}

const _yodaErrors = {
    7: _invalidUsernamePassword,
    10: {
        'User not logged in': 'Your session has timed out. Login to continue',
        '*': 'Your session has timed out. Login to continue',
    },
    14: { '*': 'The game name is invalid. Only alphabets, numbers and single underscores are allowed' },
    15: { '*': 'The age range is invalid. Please select a valid range' },
    16: { '*': 'The time range is invalid. Please select a valid range' },
    17: { '*': 'The location you selected invalid' },
    18: { '*': 'The sport you selected is invalid' },
    19: { '*': 'Sorry, you cannot host a game right now, try again later' },
    22: { '*': 'You are already in a game' },
    30: { '*': 'You are not in a game' }, //GameNotFound
    31: { //Invalid Rating
        'you have already rated the game': 'You have already rated this game',
        '*': 'Sorry but you cannot rate this game right now',
    },
    33: { '*': 'Please check the \'private\' checkbox to make this game private' }, //Invalid Private Game Flag    
}

export default deepFreeze(_yodaErrors);