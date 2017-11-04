import _getUserInfo, { _getUserFriends, _getLoggedInUserName, removeFriend, sendFriendRequest, reviewFriendRequest, uploadProfilePhoto, FriendStatus } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;

export { uploadProfilePhoto, FriendStatus, removeFriend, sendFriendRequest, reviewFriendRequest };

export default getUser