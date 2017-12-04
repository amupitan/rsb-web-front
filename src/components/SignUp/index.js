import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Notifiable } from "../../mixins";
import { createUser, onSignUp, signupForm } from '../../lib/authentication';

import Form from '../Form';
import FormButton from '../ui/FormButton';

import logo from '../../assets/rsb_logo.png';
import './style.css';


class SignUp extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);
    }

    async onSubmit(formData) {
        const res = await createUser(formData);
        if (res.error) {
            return this.onError(res.error);
        }
        return onSignUp(formData);
    }

    // This should handle displaying errors on the form
    onError(error) {
        this.setState({
            errors: error,
        });
    }

    render() {
        return (
            <div className="container ">
                <div className="smart">
                    <Link to={`/login`}>
                        <button className="btn btn-link">Back to Login</button>
                    </Link>
                    <div className="form-logo">
                        <img className="logo" src={logo} alt="rsb_logo" />
                    </div>
                    <div className="inner col-sm-offset-1 col-sm-10">
                        <Form elements={signupForm} errors={this.state.errors} button={FormButton()} title="Sign Up!" submit={this.onSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
