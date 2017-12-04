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
    editUser,
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
    editUser,
};

export default getUserInfo;