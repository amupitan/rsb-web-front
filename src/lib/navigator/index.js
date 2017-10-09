import history from './history';

const redirect = ({ path, state }) => history.push(path, state)

export default redirect;