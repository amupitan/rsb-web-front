import _getUserInfo, { _name, _getUserFriends } from './user';

export const getUser = _getUserInfo;
export const getName = _name;
export const getFriends = _getUserFriends;

export default getUser