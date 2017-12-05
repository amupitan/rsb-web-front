import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

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
            redirectToReferrer: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    async onSubmit(formData) {
        const res = await verifyCredentials(formData);
        if (res.error) {
            return this.onError(res.error);
        }

        onLogin(res);

        this.setState({
            redirectToReferrer: true,
            referrer: onLogin(res),
        });
    }

    // This should handle displaying errors on the form
    onError(error) {
        this.setState({
            errors: error,
        });
    }

    getForm() {
        //TODO: use session and actually make this work
        let username = loginForm[0];
        username.value = this.props.location.state && this.props.location.state.username;
        return [username, ...loginForm.slice(1)];
    }


    render() {
        if (this.state.redirectToReferrer) {
            const home = { from: '/' },
                { from } = this.props.location.state || home,
                next = from !== '/signup' ? from : home.from;

            return <Redirect to={next} />
        }

        return (
            <div className="container " >
                <div className="smart">
                    <Link to={`/signup`}>
                        <button className="btn btn-link">Sign Up</button>
                    </Link>
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