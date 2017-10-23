import _login, { _formElements as _loginForm, _logout, _onLogin } from './login';
import _signup, { _formElements as _signupForm, _onSignup } from './signup';
import _getStatus, { _isAuthenticated } from './status';

export const verifyCredentials = _login;
export const onLogin = _onLogin;
export const logout = _logout;
export const loginForm = _loginForm;

export const createUser = _signup;
export const signupForm = _signupForm;
export const onSignUp = _onSignup;
export const getStatus = _getStatus;
export const isAuth = _isAuthenticated;
