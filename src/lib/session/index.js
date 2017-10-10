import { isObject, isObjectString } from '../helper';

export default class session {
    static getItem(key) {
        const value = localStorage.getItem(key);
        if (isObjectString(value)) {
            return JSON.parse(value);
        }
        //TODO: this will return numbers as strings
        return value;
    }

    static setItem(key, value) {
        if (isObject(value)) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        localStorage.setItem(key, value);
    }

    static contains(key) {
        return localStorage.getItem(key) ? true : false;
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static async setState(state) {
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

}