import 'whatwg-fetch';
import session from '../session';

import { httpServerUrl as url } from './url';

export class YodaRequest {
    constructor(meta, data) {
        this.meta = meta;
        this.result = data;
    }

    toString() {
        return JSON.stringify({
            'meta': this.meta,
            'result': this.result,
        });
    }
}

export class YodaResponse {
    constructor({ meta, result }, error) {
        this.meta = meta;
        this.data = result;
        this.error = error || false;
    }

    toString() {
        return JSON.stringify({
            meta: this.meta,
            result: this.result,
        });
    }
}

export default class Yoda {
    static async login(data) {
        let path = `${url}/login`;
        let body = (new YodaRequest({}, data)).toString();

        return this.post(path, body);
    };

    static async signup(data) {
        let path = `${url}/create/user`;
        let body = (new YodaRequest({}, data)).toString();

        return this.post(path, body);
    };

    static async getUser(data) {
        let path = `${url}/user/p/0`;
        let body = (new YodaRequest({}, data)).toString();

        return this.post(path, body);
    }

    static handleHTTPError(res) {
        //TODO: do some error handling
        if (res.status === 401 || (res.result && res.result.code === 10)) { //TODO: remove hard-coded 10
            session.logOut();
        }
        res.meta = res.meta || {};
        res.result = res.result || {};
        return new YodaResponse(res, true);
    }

    static async post(path, body, isRelative = false) {
        if (isRelative) {
            // TODO: check if prefix slash was added from path
            path = `${url}${path}`;
        }
        try {
            const res = await fetch(path, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                method: 'POST',
                body: body,
            });
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(await res.json());
            }
            return new YodaResponse(await res.json());
        } catch (err) {
            console.error(err);
            return this.handleHTTPError({});
        }
    }

    static async postFile(path, file, { isRelative = false }) {
        if (isRelative) path = `${url}${path}`;

        const body = new FormData();
        body.append('file', file);

        try {
            const res = await fetch(path, {
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include',
                method: 'POST',
                body: body,
            });
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(await res.json());
            }
            return new YodaResponse(await res.json());
        } catch (err) {
            console.error(err);
            return this.handleHTTPError({});
        }
    }

    static async get(path, isRelative = false) {
        if (isRelative) {
            // TODO: check if prefix slash was added from path
            path = `${url}${path}`
        }
        try {
            const res = await fetch(path, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                method: 'GET',
            });
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(await res.json());
            }
            return new YodaResponse(await res.json());
        } catch (err) {
            console.error(err);
            return this.handleHTTPError({});
        }
    }
};