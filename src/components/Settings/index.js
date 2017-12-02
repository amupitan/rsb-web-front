import React, { Component } from 'react';

import UsernameEdit from './UsernameEdit';

import user, { getLoggedInUserName } from '../../lib/user';
import { Notifiable } from "../../mixins";

import './style.css';

class Settings extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            username: "",
            error: null,
        };

        this.onEdit = this.onEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

        this.setState({
            username: userInfo.username
        })
    }

    async updateUserInfo() {
        console.log("Submit yo");
        //If successful, display some "you've successfully completed update"
    }

    onEdit(inEditMode) {
        console.log("yolo", inEditMode);
        this.setState({
            editMode: inEditMode
        })
    }

    onSubmit() {
        this.updateUserInfo();
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div className="col-xs-6 col-xs-offset-3">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        <h4>Settings</h4>
                    </div>
                    <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{this.state.error}</p>
                    <div className="panel-body">
                        {/* Username */}
                        <UsernameEdit username={this.state.username} editMode={this.state.editMode} onEdit={this.onEdit} onSubmit={this.onSubmit} />
                    </div>
                </div>
            </div >
        );
    }
}

export default Settings;
