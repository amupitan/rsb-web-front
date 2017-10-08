import React, { Component } from 'react';

import { verifyCredentials, loginForm, onLogin } from '../../lib/authentication';
import { Notifiable } from '../../mixins';

import Form from '../Form';
import FormButton from '../ui/FormButton';

import logo from '../../assets/rsb_logo.png';
import './style.css';

class Login extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    async onSubmit(formData) {
        const res = await verifyCredentials(formData);
        if (res.error) {
            return this.onError(res.error);
        }
        return onLogin(res);
    }

    // This should handle displaying errors on the form

    // This should handle displayong errors on the form
    onError(error) {
        this.setState({
            errors: error,
        });
    }

    getForm() {
        let username = loginForm[0];
        username.value = this.props.location.state && this.props.location.state.username;
        return [username, ...loginForm.slice(1)];
    }


    render() {
        return (
            <div className="container " >
                <div className="smart">
                    <div className="form-logo">
                        <img className="logo" src={logo} alt="rsb_logo" />
                    </div>
                    <div className="inner col-sm-offset-1 col-sm-10">
                        <Form elements={this.getForm()} errors={this.state.errors} button={FormButton()} title="Login" submit={this.onSubmit} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

Login.defaultProps = {
    location: {},
}

export default Login;