import _getUserInfo, { _getUserFriends, _getLoggedInUserName, uploadProfilePhoto, FriendStatus } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;

export { uploadProfilePhoto, FriendStatus };

export default getUser