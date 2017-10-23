import yoda from '../yoda';

const getStatus = () => {
    return yoda.get('/status', true);
}

export async function _isAuthenticated() {
    const status = await getStatus();
    return status.isAuth || false;
}

export default getStatus;