import history from './history';
import session from '../session';

const redirect = ({ path, state }) => {
    history.push(path, state)
    session.setState(state);
}

export default redirect;