import _getUserInfo, { _getUserFriends, _getLoggedInUserName, removeFriend, sendFriendRequest, _handleFriendRequest, uploadProfilePhoto, FriendStatus } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;
export const handleFriendRequest = _handleFriendRequest;

export { uploadProfilePhoto, FriendStatus, removeFriend, sendFriendRequest };

export default getUser