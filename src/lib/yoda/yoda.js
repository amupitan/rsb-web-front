import 'whatwg-fetch';

//TODO: get these from somewhere else
const backend_url = 'http://127.0.0.1';
const backend_port = '4444';
const url = `${backend_url}:${backend_port}`;

class YodaRequest {
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

class YodaResponse {
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
        return new YodaResponse(res, true);
    }

    static async post(path, body) {
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
            return new YodaResponse(res.json());
        } catch (err) {
            throw err;
        }
    }
};