import React, { Component } from 'react';

import UserInfo from './UserInfo.jsx';
import { LoaderPage } from '../ui/Loader';

import { showSuccess } from '../../mixins/notifiable';
import { unsafeCopy } from "../../lib/utils";
import user, { getLoggedInUserName, editUser } from '../../lib/user';
import { Notifiable } from "../../mixins";

import './style.css';

class Settings extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            errorMessage: ""
        };

        this.onEdit = this.onEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    componentDidMount() {
        const username = getLoggedInUserName();
        this.getUser(username);
    }

    async getUser(username) {
        const userInfo = await user({ username, populate: 1 });

        if (userInfo.error) {
            this.setState({ errorMessage: userInfo.data });
            return;
        }

        const userData = {
            "username": userInfo.username,
            "firstname": userInfo.firstname,
            "lastname": userInfo.lastname,
            "password": "",
            "newPassword": "",
            "email": "",
        }

        this.setState({
            userData: userData,
            formData: userData
        })
    }

    async updateUserInfo(event) {
        const field = event.target.id;
        const formDataTemp = unsafeCopy(this.state.formData)
        formDataTemp[field] = event.target.value;

        this.setState({
            formData: formDataTemp
        })
    }

    onEdit(inEditMode) {
        this.setState({
            editMode: inEditMode,
            formData: this.state.userData
        })
    }

    async onSubmit() {
        const res = await editUser(this.state.formData);

        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }
        showSuccess("Successfully updated information");

        this.setState({
            editMode: false,
            userData: this.state.formData
        })

    }

    render() {
        if (this.state.formData == null) return <LoaderPage />;
        const { errorMessage } = this.state;
        return (
            <div className="col-xs-6 col-xs-offset-3">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        <h4>Settings</h4>
                        <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                    </div>
                    <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{this.state.error}</p>
                    <div className="panel-body">
                        <UserInfo formData={this.state.formData} editMode={this.state.editMode} onEdit={this.onEdit} onSubmit={this.onSubmit} updateUserInfo={this.updateUserInfo} />
                    </div>
                </div>
            </div >
        );
    }
}

export default Settings;
