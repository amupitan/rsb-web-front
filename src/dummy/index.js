import userWithFriends from './user';
import friendData from './friends';
import getMarkers from './mapMarkers';

export default (url) => {
    switch (url) {
        case "/user/p/1":
            return userWithFriends
        case "games/l/lng/0/lat/0":
            return getMarkers;
        case "/user/f/1":
            return friendData;
        default:
            return {}
    }

} 