import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ViewUser from '../ViewUser';


class Users extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <Switch>
                <Route path='/user/:username'
                    render={(props) => (
                        <ViewUser {...props} />)} />
            </Switch>
        )
    }
}

export default Users;