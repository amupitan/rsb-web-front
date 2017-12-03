import socket from '../socket';

const socketConnection = socket.connection;

/**
 * Maintains a connection to a socket connection
 */
export default class Subscription {
    constructor(name, action) {
        socketConnection.connect();
        this.subscription = socketConnection.on(name, { listener: action });
    }

    /**
     * Returns a new handler
     * @returns {Subscriber} a new subscription handler
     */
    static get subscriber() {
        return new Subscriber();
    }

    /**
     * unsubscribes from the subscription
     */
    unsubscribe() {
        this.subscription.cancel();
        delete this.subscription;
    }

    /**
     * creates a new subscription
     * @returns {Subscription} the subscription created
     */
    static subscribe = ({ name, action }) => new Subscription(name, action);
}

/**
 * Handles a group of {Subscription}s
 */
class Subscriber {
    constructor() {
        /**
         * keeps track of the subscriptions
         */
        this.subscriptions = [];
    }

    /**
     * Returns the number of subscriptions
     */
    get length() { return this.subscriptions.length; }

    /**
     * Subscribes a set of subscriptions to the handler
     * @param {Array<Subscription>} subscriptions 
     */
    multiple(subscriptions = []) {
        for (const subscription of subscriptions) {
            this.subscriptions[this.length] = subscription;
        }
    }

    /**
     * Subscribes to the subscription
     * @param {Subscription} subscription 
     */
    add(subscription) {
        this.subscriptions[this.length] = subscription;
    }

    /**
     * unsubscribes from all subscriptions
     */
    clearSubscriptions() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }


}