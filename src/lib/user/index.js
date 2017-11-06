import {
    getUserInfo,
    getUserFriends,
    getLoggedInUserName,
    removeFriend,
    sendFriendRequest,
    reviewFriendRequest,
    cancelFriendRequest,
    uploadProfilePhoto,
    FriendStatus,
    getGameHistory,
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
    getGameHistory,
};

export default getUserInfo;