import session from '../lib/session';

// Notifiable mixin, will need a wrapper over it to be used
// Classes that implement this mixin should implement the 
// notify(string) function
// This class causes notifications to be displayed
const Notifiable = (Notifiable) => class extends Notifiable {
    constructor() {
        super();
        if (!this.notify) {
            throw new Error('Must implement notify(object)');
        }
    }

    componentDidUpdate() {
        if (super.componentDidUpdate) {
            super.componentDidUpdate();
        }
        this.renderNotification();
        this.renderError();
    }

    componentDidMount() {
        this.renderNotification();
        this.renderError();
    }

    renderNotification() {
        if (super.renderNotification) {
            super.renderNotification();
        }

        const message = session.getItem('info');
        if (message) {
            session.removeItem('info');
            this.notify({ message: message });
        }
    }

    renderError() {
        if (super.renderError) {
            super.renderError();
        }

        const error = session.getItem('error');
        if (error) {
            session.removeItem('error');
            this.notify({ title: error.title, message: error.message, type: 'danger' });
        }
    }
};


const _showMessage = (type, modifier = (msg) => msg) => (message) => session.setItem(type, (modifier(message)));

// displays an info notification on a Notifiable Component
export const showInfo = _showMessage('info');

// displays a success notification on a Notifiable Component
export const showSuccess = _showMessage('success');

// displays an error notification on a Notifiable Component
export const showError = _showMessage('error', (err) => {
    if (typeof err === 'string') return { message: err };
    return err;
});

export default Notifiable;