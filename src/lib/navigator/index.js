import history from '../../components/App/history';

const redirect = ({ path, state }) => history.push(path, state)

export default redirect;