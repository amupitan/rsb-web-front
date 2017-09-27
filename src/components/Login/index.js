import React from 'react';

import yoda from '../../lib/yoda';
import Form from '../Form';
import FormButton from '../ui/FormButton';

import logo from '../../assets/rsb_logo.png';
import './style.css';


const formElements = [
    {
        name: 'username',
        placeholder: 'ellenjohnson',
        type: 'text',
        validate: (value) => {
            if (value.length < 4 || value.length > 10) return 'Incorrect Length';
            return false;
        }
    },
    {
        name: 'password',
        placeholder: 'xxxxxxxxxx',
        type: 'password',
        validate: (value) => {
            if (value.length < 6 || value.length > 120) return 'Incorrect Length';
            return false;
        }
    },
];

var login = data => {
    yoda.login(data, console.log);
};

var Login = (props) => {
    return (
        <div className="container ">
            <div className="smart">
                <div className="form-logo">
                    <img className="logo" src={logo} alt="rsb_logo" />
                </div>
                <div className="inner col-sm-offset-1 col-sm-10">
                    <Form elements={formElements} button={FormButton()} title="Login" submit={login} />
                </div>
            </div>
        </div>
    );
};

export default Login;
