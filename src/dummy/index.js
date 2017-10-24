import getMarkers from './mapMarkers';
import game from './game';
import games from './games';

export default (url) => {
    switch (url) {
        case "games/l/lng/0/lat/0":
            return getMarkers;
        case "/game/g/123":
            return game;
        case "/game/join/i":
            return { data: games[0] };
        default:
            return {}
    }

} 