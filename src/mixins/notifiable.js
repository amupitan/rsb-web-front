import session from '../lib/session';

// Notifiable mixin, will need a wrapper over it to be used
// Classes that implement this mixin should implement the 
// notify(string) function
// This class causes notifications to be displayed
const Notifiable = (Notifiable) => class extends Notifiable {
    constructor() {
        super();
        if (!this.notify) {
            throw new Error('Must implement notify(string)');
        }
    }

    componentDidUpdate() {
        if (super.componentDidUpdate) {
            super.componentDidUpdate();
        }
        this.renderNotification();
        this.renderError();
    }

    // componentDidMount() {
    //     this.renderNotification();
    //     this.renderError();
    // }

    renderNotification() {
        if (super.renderNotification) {
            super.renderNotification();
        }

        const message = session.getItem('info');
        if (message) {
            session.removeItem('info');
            this.notify({ text: message });
        }
    }

    renderError() {
        if (super.renderError) {
            super.renderError();
        }

        const error = session.getItem('error');
        if (error) {
            session.removeItem('error');
            this.notify({ title: error.title, text: error.text, type: 'danger' });
        }
    }
};

export default Notifiable;