import React from 'react';

import Form from '../Form';
import FormButton from '../ui/FormButton';

import logo from '../../assets/rsb_logo.png';
import './style.css';


const formElements = [
    [
        {
            name: 'firstname',
            placeholder: 'Ellen',
            type: 'text',
        },
        {
            name: 'lastname',
            placeholder: 'Johnson',
            type: 'text',
        },
    ],
    {
        name: 'username',
        placeholder: 'ellenjohnson',
        type: 'text',
        validate: (value) => {
            if (value.length < 4 || value.length > 10) return 'Incorrect Length';
            return false;
        }
    },
    [
        {
            name: 'password',
            placeholder: 'xxxxxxxxxx',
            type: 'password',
            validate: (value) => {
                if (value.length < 6 || value.length > 120) return 'Incorrect Length';
                return false;
            }
        },
        {
            name: 'cpassword',
            title: 'Confirm Password',
            placeholder: 'xxxxxxxxxx',
            type: 'password',
            validate: (value) => {
                if (value.length < 6 || value.length > 120) return 'Incorrect Length';
                return false;
            }
        },
    ],
    {
        name: 'email',
        placeholder: 'xxx@xxx.com',
        type: 'email',
        validate: (value) => {
            if (value.length < 6 || value.length > 120) return 'Incorrect Length';
            return false;
        },
    },
    [
        {
            name: 'zipcode',
            placeholder: 'xxxxx-xxxx',
            type: 'text',
            validate: (value) => {
                if (value.length !== 5 && value.length !== 10) return 'Invalid Zipcode';
                return false;
            },
        },
        {
            name: 'dob',
            title: 'Date of Birth',
            type: 'date',
            placeholder: 'MM-DD-YYYY',
            validate: (value) => {
                if (value.length !== 10) return 'Invalid Date of Birth';
                return false;
            },
        },
    ]
];

var SignUp = (props) => {
    return (
        <div className="container ">
            <div className="smart">
                <div className="form-logo">
                    <img className="logo" src={logo} alt="rsb_logo" />
                </div>
                <div className="inner col-sm-offset-1 col-sm-10">
                    <Form elements={formElements} button={FormButton()} title="Sign Up!" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
