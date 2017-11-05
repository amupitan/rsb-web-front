import {
    getUserInfo,
    getUserFriends,
    getLoggedInUserName,
    removeFriend,
    sendFriendRequest,
    reviewFriendRequest,
    cancelFriendRequest,
    uploadProfilePhoto,
    FriendStatus
} from './user';

export {
    uploadProfilePhoto,
    FriendStatus,
    removeFriend,
    sendFriendRequest,
    reviewFriendRequest,
    cancelFriendRequest,
    getLoggedInUserName,
    getUserFriends as getFriends,
};

export default getUserInfo;