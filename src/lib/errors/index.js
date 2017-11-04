import errors from './yodaErrors';

const formattedError = error => {
    if (!error) console.error('Did not receive error, check call stack: errors/index.js');
    const set = errors[error && error.code] || {};
    return set[error && error.message] || set['*'] || 'An unknown error was encountered';
}

// returns a error that can be displayed by [showError] from [notifiable]
export const readableError = error => ({ message: formattedError(error) })


// Deprecated(0.0.1) use [readableError] instead
export default formattedError;