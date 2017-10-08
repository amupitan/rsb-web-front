import _login, { _formElements, _logout, _onLogin } from './login';

export const verifyCredentials = _login;
export const onLogin = _onLogin;
export const logout = _logout;
export const formElements = _formElements;
