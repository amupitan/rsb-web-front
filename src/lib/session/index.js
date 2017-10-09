export default class session {
    static getItem(key) {
        return sessionStorage.getItem(key);
    }

    static setItem(key, value) {
        sessionStorage.setItem(key, value)
    }

    static contains(key) {
        return sessionStorage.getItem(key) ? true : false;
    }

    static removeItem(key) {
        sessionStorage.removeItem(key);
    }

    static clear() {
        sessionStorage.clear();
    }

    static async setState(state) {
        if (typeof state !== 'object') return;
        const keys = Object.keys(state);
        for (const key of keys) {
            this.setItem(key, state[key]);
        }
    }

    static logOut() {
        sessionStorage.clear();
    }

    static get isLoggedIn() {
        return this.contains('username');
    }

}