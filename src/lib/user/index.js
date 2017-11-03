import _getUserInfo, { _getUserFriends, _getLoggedInUserName, uploadProfilePhoto, FriendStatus, _getGameHistory } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;
export const getGameHistory = _getGameHistory

export { uploadProfilePhoto, FriendStatus };

export default getUser