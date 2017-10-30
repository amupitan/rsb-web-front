import _getUserInfo, { _getUserFriends, _getLoggedInUserName, _handleImageChange } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;
export const handleImageChange = _handleImageChange;

export default getUser