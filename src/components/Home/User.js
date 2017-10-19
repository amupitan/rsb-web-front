import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ViewUser from '../ViewUser';


class Users extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <Route path='/user/:username'
                render={(props) => (
                    <ViewUser {...props} />)} />
        )
    }
}

export default Users;