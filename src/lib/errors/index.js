import errors from './yodaErrors';

export default function (error) {
    const set = errors[error.code] || {};
    return set[error.message] || 'An unknown error was encountered';
}