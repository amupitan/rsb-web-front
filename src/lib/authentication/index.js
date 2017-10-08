import _login, { _formElements, _destroySession } from './login';

export const verifyCredentials = _login;
export const logout = _destroySession;
export const formElements = _formElements;
