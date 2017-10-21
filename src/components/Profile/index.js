import React, { Component } from 'react';

import PopulateRequests from './PopulateRequests';

import user, { getUserFriends } from '../../lib/user';
import redirect from '../../lib/navigator';

import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import { LoaderPage } from '../ui/Loader';

import defaultImg from '../../dummy/default.jpg';
import mockServer from '../../dummy';




import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockServer("/user/p/1"),
        }

    }

    componentWillMount() {
        this.getUserInfo(this.props.match);
    }

    async getUserInfo(m) {
        if (m) {
            const u = await user(m.params.username);
            const friend = await getUserFriends(m.params.username);
            this.setState({
                user: u,
                friends: friend

            })
        }
    }


    getHeading(u) {
        console.log("Head: ", u);
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    {/*TODO: Don't use this image foolz*/}
                    <img src={this.state.data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{u.username}</h4>
                    {/* <RSBLabel
                        name={this.state.data.numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    /> */}
                    <span>Full Name: {u.firstname} {u.lastname}</span>
                </div>
            </div>
        )
    }

    getFriendRequest() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friend Requests</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={this.state.data.result[0].FriendRequests}
                    />
                </div>
            </div>
        )
    }

    getGameInvites() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Games Invites</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={this.state.data.result[0].GameInvites}
                    />
                </div>
            </div>
        )
    }

    getFriends(f) {
        console.log("Friends for: ", f);
        console.log("Expecting friends: ", this.state.data.result[0].Friends)
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    {this.displayFriends(f)}
                </div>
            </div>
        );
    }

    displayFriends(f){
        let users = [];
        f.forEach((el, i) => {
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
                        <img src={el.ProfilePic || defaultImg} alt="Profile" className="profile-pic-xs"
                            onClick={() => {
                                redirect({ path: '/user/' + el.username });
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
                            name={el.username}
                            onClickFunction={() => {
                                redirect({ path: '/user/' + el.username });
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

    getGameHistory() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Game History</h2>
                </div>
                <div className="scroll-info panel-body">
                    <RSBLabel
                        name="Game History"
                        className="game-history-link"
                        onClickFunction={() => {
                            console.log("Clicked Game History label")
                        }}
                    />
                </div>
            </div>
        )
    }
    render() {
        // return (
        //     <div className="panel col-xs-10 col-xs-offset-1">
        //         {this.heading()}
        //         <div className="row">
        //             {this.getFriendRequest()}
        //             {this.getGameInvites()}
        //         </div>
        //         <div className="row">
        //             {this.getFriends()}
        //             {this.getGameHistory()}
        //         </div>
        //     </div >
        // )
        if (this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.user.city) { //If there's a city, it's the current user
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    {this.getHeading(this.state.user)}
                    <div className="row">
                             {this.getFriendRequest()}
                             {this.getGameInvites()}
                         </div>
                         <div className="row">
                            {this.getFriends(this.state.friends)}
                            {this.getGameHistory(this.state.user.username)}
                         </div>
                     </div >
            )
        } else {
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    {this.getHeading(this.state.user)}
                    <div className="row">
                        {this.getFriends(this.state.friends)}
                        {this.getGameHistory(this.state.user.username)}
                    </div>
                </div >
            )
        }
    }
}

export default Profile;
