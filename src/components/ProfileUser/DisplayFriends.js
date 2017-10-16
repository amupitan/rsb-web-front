import React, { Component } from 'react';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';
import redirect from '../../lib/navigator';

import './style.css';

export default class DisplayFriends extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    genFriends() {
        let users = [];
        this.props.friends.forEach((el, i) => {
            users.push(
                <div className="populate-requests row" key={i}>
                    <div className="col-sm-4 col-sm-pull">
                        {/*Using redirect instead of links because links require to be under Router error came up*/}
                        <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs"
                            onClick={() => {
                                redirect({ path: '/user/' + el.Username });
                            }} />

                    </div>
                    <div className="col-sm-4">
                        <RSBLabel
                            name={el.Username}
                            onClickFunction={() => {
                                redirect({ path: '/user/' + el.Username });
                            }}
                            key={i}
                        />
                    </div>
                    <div className="col-sm-4">
                        <RSBButton
                            glyphicons="glyphicon glyphicon-remove"
                            className="decline"
                            onClickFunction={() => {
                                console.log("Decline!");
                            }}
                        />
                    </div>
                </div>);
        });
        return users;
    }

    render() {
        return (
            <div>
                {this.genFriends()}
            </div>
        );
    }
}