import ProfileUser from '../ProfileUser';
import CurrentGame from '../CurrentGame';
import MapPage from '../MapPage';
import HostPage from '../HostGame';
import Settings from '../Settings';
import Join from '../Join';
import Friends from '../Friends';
import ViewUser from '../ViewUser';

// Represents the views displayed by links from the hamburger menu
// the [component] should always be a React.Component and not a callback
// that returns a component
// e.g const Goodcomponent = (props) => <div /> is ok
// e.g cont BadComponent = () => <GoodComponent {...props} /> is not ok
// This is because we use React router's component to render our components, if 
// we ever need the behaviour of 'Bad Component' then we'll have to modify how 
// we use React-Router
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
        name: 'View User',
        path: 'user',
        component: ViewUser
    },
    {
        name: 'Settings',
        path: 'settings',
        component: Settings,
    },
    {
        name: 'Join',
        path: 'join',
        component: Join,
    },
    {
        name: 'Friends',
        path: 'friends',
        component: Friends,
    }
];

export default views;