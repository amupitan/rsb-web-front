const remoteServerAddress = 'proj-309-rb-b-5.cs.iastate.edu';
const localServerAddress = '127.0.0.1';
const backend_port = 4444;

const backend_url = process.env.REACT_APP_BACKEND === 'LOCAL' ? localServerAddress : remoteServerAddress;

export const httpServerUrl = `http://${backend_url}:${backend_port}`;
export const webSocketUrl = `ws://${backend_url}:${backend_port}`;