import 'whatwg-fetch';

//TODO: get these from somewhere else
const backend_url = 'http://127.0.0.1';
const backend_port = '4444';
const url = `${backend_url}:${backend_port}`;

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
        res.meta = res.meta || {};
        res.result = res.result || {};
        return new YodaResponse(res, true);
    }

    static async post(path, body, isRelative = false) {
        let temp;
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
            temp = res;
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(await res.json());
            }
            return new YodaResponse(await res.json());
        } catch (err) {
            console.log(temp);
            console.error(err);
            return this.handleHTTPError({});
        }
    }

    static async get(path, isRelative = false) {
        let temp;
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
            temp = res;
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(await res.json());
            }
            return new YodaResponse(await res.json());
        } catch (err) {
            console.log(temp);
            console.error(err);
            return this.handleHTTPError({});
        }
    }
};