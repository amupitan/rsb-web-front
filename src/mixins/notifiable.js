import session from '../lib/session';

// Notifiable mixin, will need a wrapper over it to be used
// It is used as follows:
//      import { Component } from 'react';
//      class MyComponent extends Notifiable(Component) {
//          
//      }
// This class causes notifications to be displayed
const Notifiable = (Notifiable) => class extends Notifiable {
    constructor(props) {
        super(props);
        if (!this.props.notify ||
            typeof this.props.notify.show !== 'function' ||
            typeof this.props.notify.hide !== 'function') {
            throw new Error('Notifiable props must contain notify object contains hide() and show() methods');
        }
    }

    componentDidUpdate() {
        if (super.componentDidUpdate) {
            super.componentDidUpdate();
        }
        this.renderNotification();
        this.renderError();
    }

    componentWillMount() {
        if (super.componentWillMount) {
            super.componentWillMount();
        }
        this.props.notify.hide();
    }

    componentDidMount() {
        if (super.componentDidMount) {
            super.componentDidMount();
        }
        this.renderNotification();
        this.renderError();
    }

    _renderInformation(item = 'info', content = () => ({})) {
        if (!window.localStorage) return;
        if (super.renderNotification) {
            super.renderNotification();
        }

        const message = session.getItem(item);
        if (message) {
            session.removeItem(item);
            return this.props.notify.show(content(message));
        }
    }

    renderNotification() {
        this._renderInformation('info', (info) => ({ message: info }));
        this._renderInformation('success', (msg) => ({ message: msg, type: 'success' }));
    }

    renderError() {
        this._renderInformation('error', (error) => ({ title: error.title, message: error.message, type: 'danger' }));
    }
};


const _showMessage = (type, modifier = msg => msg) => (message) => session.setItem(type, (modifier(message)));

/**
 * displays an info notification on a Notifiable Component
 * @deprecated
 */
export const showInfo = _showMessage('info');

/**
 * displays a success notification on a Notifiable Component
 * @deprecated
 */
export const showSuccess = _showMessage('success');

/**
 * displays an error notification on a Notifiable Component
 * @deprecated
 */
export const showError = _showMessage('error', (err) => {
    if (typeof err === 'string') return { message: err };
    return err;
});

export default Notifiable;