import { webSocketUrl as url } from '../yoda';
import { wait } from '../utils';

import MockWS from './mock';

const timeout = 15,
    PING = 'ping',
    PONG = 'pong';

window.WebSocket = window.WebSocket || MockWS;

export default class Socket {
    constructor() {
        this.ws = new WebSocket(`${url}/establish`);
        this._handleMessage = this._handleMessage.bind(this);
        this._updateHandlers = this._updateHandlers.bind(this);

        this._pingTimeout = 0;
        this._reconnect = 0;
    }

    connect() {
        const { disconnected, closing } = this.status;
        if (disconnected || closing) {
            this.ws = new window.WebSocket(`${url}/establish`);
            this._updateHandlers();
        }
    }

    static get connection() {
        const sock = new Socket();
        sock._updateHandlers();

        return sock;
    }

    _updateHandlers() {
        this.ws.onopen = (m) => {
            console.log('Connected to rsb');

            // clear reconnecting interval if present
            if (this._reconnect) {
                clearInterval(this._reconnect);
            }

            // send ping message every 60 seconds
            this._pingTimeout = setInterval(() => this.send('ping'), timeout * 1000);
        };

        this.ws.onclose = () => {
            if (this._pingTimeout) {
                clearInterval(this._pingTimeout);
            }

            // attempt to reconnect after every 60 seconds
            this._reconnect = setInterval(() => this.connect(), timeout * 1000);

            console.log('Disconnected from rsb');
        }

        this.ws.onmessage = this._handleMessage;
    }

    _handleMessage(messageEvent) {
        const { data } = messageEvent;

        // ignore pong messages
        if (data === PONG) return;

        // send pong on ping messages from server
        if (data === PING) {
            this.send(PONG);
            return;
        }

        console.log(messageEvent);
        const message = JSON.parse(data);

        if (message.code && message.error) {
            return this._handleError(message);
        }

        if (!message.meta || !message.result) {
            console.error(message);
            return;
        }

        const event = new Event(message.meta.name);
        event.data = message.result;

        this.ws.dispatchEvent(event);
    }

    _handleError(error) {
        console.error(error);
    }

    on(name, { listener }) {
        this.ws.addEventListener(name, (evt) => {
            listener(evt.data);
        }, false);

        return {
            cancel: () => this.ws.removeEventListener(name, listener, false)
        }
    }

    async send(data) {
        let period = 0
        while (!this.connected) {
            await wait(.5);
            period += .5;
            if (period === 100) {
                console.error('did not send after 100 ms');
                return;
            }
        }
        this.ws.send(data);
    }

    get connected() {
        return this.ws.readyState === this.ws.OPEN;
    }

    get status() {
        const { readyState } = this.ws;
        return {
            connected: this.connected,
            disconnected: readyState === this.ws.CLOSED,
            connecting: readyState === this.ws.CONNECTING,
            closing: readyState === this.ws.CLOSING,
        }
    }
}
