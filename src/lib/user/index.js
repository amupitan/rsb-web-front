import _getUserInfo, { _getUserFriends, _getLoggedInUserName } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;

export default getUser