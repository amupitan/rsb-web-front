import React, { Component } from 'react';

import { verifyCredentials, formElements } from '../../lib/authentication';

import Form from '../Form';
import FormButton from '../ui/FormButton';

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
    }

    async onSubmit(formData) {
        const res = await verifyCredentials(formData);
        if (res.error) {
            return this.onError(res.error);
        }
        return this.onSuccess(res.data);
    }

    onSuccess(newPath) {
        this.props.history.push(newPath);
    }

    // This should handle displayong errors on the form
    onError(error) {
        this.setState({
            errors: error,
        });
    }

    render() {
        return (
            <div className="container " >
                <div className="smart">
                    <div className="form-logo">
                        <img className="logo" src={logo} alt="rsb_logo" />
                    </div>
                    <div className="inner col-sm-offset-1 col-sm-10">
                        <Form elements={formElements} errors={this.state.errors} button={FormButton()} title="Login" submit={this.onSubmit} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
