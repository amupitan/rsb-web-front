import history from './history';
import session from '../session';

// re-routes the user to the page component with [path] and sets state additionally
// if no arguments are passed in, it re-routes to the current component
const redirect = ({ path = history.location.pathname, state = {} } = {}) => {
    state.from = history.location.pathname;
    session.setState(state);
    history.push(path, state);
}

export default redirect;