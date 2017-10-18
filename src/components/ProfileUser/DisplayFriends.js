import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';



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

                        {/*This sets the url to the user, but it doesn't refresh the page*/}
                        {/* <Router>
                            <span className="">
                                <Link to={`/user/${el.Username}`} >
                                    <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs" />
                                </Link>
                            </span>
                        </Router> */}
                        <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs"
                            onClick={() => {
                                redirect({ path: '/user/' + el.Username });
                            }} />

                    </div>
                    <div className="col-sm-4">
                        {/* <Router>
                            <span className="">
                                <Link to={`/user/` + el.Username} >
                                    {el.Username}
                                </Link>
                            </span>
                        </Router> */}
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