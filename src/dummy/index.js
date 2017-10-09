import userWithFriends from './user';
import friendData from './friends';
import getMarkers from './mapMarkers';
import games from './games';

export default (url) => {
    switch (url) {
        case "/user/p/1":
            return userWithFriends
        case "games/l/lng/0/lat/0":
            return getMarkers;
        case "/user/f/1":
            return friendData;
        case "/game/join/i":
            return { data: games[0] };
        default:
            return {}
    }

} 