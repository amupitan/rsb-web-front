import { isObject, isObjectString } from '../utils';

export default class session {
    static getItem(key) {
        if (!window.localStorage) return;
        const value = localStorage.getItem(key);
        if (isObjectString(value)) {
            return JSON.parse(value);
        }
        //TODO: this will return numbers as strings
        return value;
    }

    static setItem(key, value) {
        if (!window.localStorage) return;
        if (isObject(value)) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        localStorage.setItem(key, value);
    }

    static contains(key) {
        if (!window.localStorage) return;
        return localStorage.getItem(key) ? true : false;
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static setState(state) {
        if (typeof state !== 'object') return;
        const keys = Object.keys(state);
        for (const key of keys) {
            this.setItem(key, state[key]);
        }
    }

    static logOut() {
        this.clear();
    }

    static get isLoggedIn() {
        return this.contains('username');
    }

    static get user() {
        return this.getItem('user');
    }

    static set user({ firstname, lastname, username, avatar, rating }) {
        return this.setState({
            user: {
                username,
                firstname,
                lastname,
                avatar,
                rating,
            }
        });
    }

}