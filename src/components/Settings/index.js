import React, { Component } from 'react';

import UserInfo from './UserInfo';
import { LoaderPage } from '../ui/Loader';

import { showSuccess } from '../../mixins/notifiable';
import { editUser } from '../../lib/user';
import { unsafeCopy } from "../../lib/utils";
import user, { getLoggedInUserName } from '../../lib/user';
import { Notifiable } from "../../mixins";

import './style.css';

class Settings extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
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
        var userInfo = await user({ username, populate: 1 });

        if (userInfo.error) {
            //TODO do something when there's an error
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
            //TODO Handle error 
            return;
        }

        this.setState({
            editMode: false,
            userData: this.state.formData
        })

        showSuccess("Successfully updated information");
    }

    render() {
        if (this.state.formData == null) return <LoaderPage />;

        return (
            <div className="col-xs-6 col-xs-offset-3">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        <h4>Settings</h4>
                    </div>
                    <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{this.state.error}</p>
                    <div className="panel-body">
                        {<UserInfo formData={this.state.formData} editMode={this.state.editMode} onEdit={this.onEdit} onSubmit={this.onSubmit} updateUserInfo={this.updateUserInfo} />}
                    </div>
                </div>
            </div >
        );
    }
}

export default Settings;
