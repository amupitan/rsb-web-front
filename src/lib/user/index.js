import _getUserInfo, { _name, _getUserFriends, } from './user';

export const getUser = _getUserInfo;
export const getUserFriends = _getUserFriends
export const getName = _name;

export default getUser