import ProfileUser from '../ProfileUser';
import CurrentGame from '../CurrentGame';
import MapPage from '../MapPage';
import HostPage from '../HostGame';
import Settings from '../Settings';

const views = [
    {
        name: 'Map',
        path: 'map',
        component: MapPage,
    },
    {
        name: 'Current Game',
        path: 'game',
        component: CurrentGame,
    },
    {
        name: 'Profile',
        path: 'me',
        component: ProfileUser,
    },
    {
        name: 'Host',
        path: 'host',
        component: HostPage,
    },
    {
        name: 'Settings',
        path: 'settings',
        component: Settings,
    },
];

export default views;