import history from './history';
import session from '../session';

const redirect = ({ path, state }) => {
    session.setState(state);
    history.push(path, state)
}

export default redirect;