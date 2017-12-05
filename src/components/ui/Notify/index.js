import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { wait } from '../../../lib/utils';

import './style.css';

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true,
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(evt) {
        evt.persist();
        this.setState({
            display: false,
        });
        wait(1000).then(this.props.onClose);
    }

    render() {
        const { title, type, message } = this.props;
        const classes = classnames('notify-alert', 'text-center', type, {
            'notify-visible': this.state.display,
            'notify-hidden': !this.state.display,
        })
        return (
            <div className={classes} >
                <span className="closebtn" onClick={this.handleClose}>&times;</span>
                <strong>{title && `${title}: `}</strong>{message}
            </div>
        );
    }
}

Notify.defaultProps = {
    type: 'info',
    title: '',
    message: '',
};

Notify.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    onClose: PropTypes.func.isRequired,
}
export default Notify;
