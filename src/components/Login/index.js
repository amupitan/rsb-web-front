import React, { Component } from 'react';

import { verifyCredentials, loginForm, onLogin } from '../../lib/authentication';

import Form from '../Form';
import FormButton from '../ui/FormButton';
import Notify from '../ui/Notify';

import logo from '../../assets/rsb_logo.png';
import './style.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
        this.renderLocationInfo = this.renderLocationInfo.bind(this);
    }

    async onSubmit(formData) {
        const res = await verifyCredentials(formData);
        if (res.error) {
            return this.onError(res.error);
        }
        return onLogin(res.data);
    }

    // This should handle displaying errors on the form
    onError(error) {
        this.setState({
            errors: error,
        });
    }

    renderLocationInfo() {
        if (this.props.location.state && this.props.location.state.info) {
            const message = this.props.location.state.info;
            window.history.pushState({ info: null }, '')

            return <Notify text={message} />;
        }
    }

    render() {
        return (
            <div className="container " >
                {this.renderLocationInfo()}
                <div className="smart">
                    <div className="form-logo">
                        <img className="logo" src={logo} alt="rsb_logo" />
                    </div>
                    <div className="inner col-sm-offset-1 col-sm-10">
                        <Form elements={loginForm} errors={this.state.errors} button={FormButton()} title="Login" submit={this.onSubmit} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
