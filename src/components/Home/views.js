import CurrentGame from '../CurrentGame';
import Map from '../Map';
import HostPage from '../HostGame';
import Settings from '../Settings';
import Join from '../Join';
import Friends from '../Friends';
import Profile from '../Profile';
import GameHistory from '../GameHistory';

// Represents the views displayed by links from the hamburger menu
// the [component] should always be a React.Component and not a callback
// that returns a component
// e.g const Goodcomponent = (props) => <div /> is ok
// e.g cont BadComponent = () => <GoodComponent {...props} /> is not ok
// This is because we use React router's component to render our components, if 
// we ever need the behaviour of 'Bad Component' then we'll have to modify how 
// we use React-Router
// Usage:
//      {
//           name: 'MyComponent', //name of the component in the menu and as an identifier
//           path: 'mycomponent', //required: location path to the compoennt
//           isMenuOption: false, //defaults to false: set this to true if you want the component to appear on the menu
//           component: MapPage, //required: the component
//           noRoute: false, //defaults to false: set this to true if you do not want a route to be created for this component
//      },
const views = [
    {
        name: 'Map',
        path: 'map',
        isMenuOption: true,
        component: Map,
    },
    {
        name: 'Current Game',
        path: 'game',
        isMenuOption: true,
        component: CurrentGame,
    },
    {
        name: 'Profile',
        path: 'user',
        component: Profile,
        isMenuOption: false,
        noRoute: false,
    },
    {
        name: 'UserPage',
        path: 'user/:username?',
        component: Profile,
        isMenuOption: false,
    },
    {
        name: 'Host',
        path: 'host',
        isMenuOption: true,
        component: HostPage,
    },
    {
        name: 'Join',
        path: 'join',
        isMenuOption: true,
        component: Join,
    },
    {
        name: 'Friends',
        path: 'friends',
        isMenuOption: true,
        component: Friends,
    },
    {
        name: 'Settings',
        path: 'settings',
        isMenuOption: true,
        component: Settings,
    },
    {
        name: 'Game History',
        path: 'history',
        isMenuOption: false,
        component: GameHistory
    },
    {
        name: 'Previous Games',
        path: 'history/:username?',
        component: GameHistory,
        isMenuOption: false,
    },
    {
        name: 'Invite friends',
        path: 'invite',
        component: Friends,
        isMenuOption: false,
    },
];



export default views;