import errors from './yodaErrors';

export default function (error) {
    if (!error) console.error('Did not receive error, check call stack: errors/index.js');
    const set = errors[error && error.code] || {};
    return set[error && error.message] || 'An unknown error was encountered';
}