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

export default class Yoda {
    static login(data, callback) {
        let path = `${url}/login`;
        let body = (new YodaRequest({}, data)).toString();

        this.post(path, body, callback);
    };

    //TODO: this is repeated
    static signup(data, callback) {
        let path = `${url}/create/user`;
        let body = (new YodaRequest({}, data)).toString();

        this.post(path, body, callback);
    };

    static getUser(data, callback) {
        let path = `${url}/user/p/0`;
        let body = (new YodaRequest({}, data)).toString();

        this.post(path, body, callback);
    }

    static handleHTTPError(res) {
        //TODO: do some error handling
        return res;
    }

    static post(path, body, callback) {
        fetch(path, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'POST',
            body: body,
        }).then((res) => {
            console.log(document.cookie);
            if (res.status < 200 || res.status >= 300) {
                return this.handleHTTPError(res);
            }
            return res.json();
        }).then((json) => {
            callback(json, null)
        }).catch((err) => {
            console.error(err);
            callback(null, err);
        });

    }
};