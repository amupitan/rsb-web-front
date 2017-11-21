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
    toFriends,
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
    toFriends,
};

export default getUserInfo;