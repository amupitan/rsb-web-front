import _getUserInfo, { _getUserFriends, _getLoggedInUserName, _removeFriend, _sendFriendRequest, _handleFriendRequest, uploadProfilePhoto, FriendStatus } from './user';

export const getUser = _getUserInfo;
export const getLoggedInUserName = _getLoggedInUserName;
export const getFriends = _getUserFriends;
export const removeFriend = _removeFriend;
export const sendFriendRequest = _sendFriendRequest;
export const handleFriendRequest = _handleFriendRequest;

export { uploadProfilePhoto, FriendStatus };

export default getUser