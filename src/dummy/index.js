import userWithFriends from './user';
import friendData from './friends';
import getMarkers from './mapMarkers';
import game from './game';
import games from './games';
import viewUser from './viewUser';

export default (url) => {
    switch (url) {
        case "/user/p/1":
            return userWithFriends
        case "games/l/lng/0/lat/0":
            return getMarkers;
        case "/game/g/123":
            return game;
        case "/user/f/1":
            return friendData;
        case "/game/join/i":
            return { data: games[0] };
        case "/user/TODO":
            return viewUser
        default:
            return {}
    }

} 