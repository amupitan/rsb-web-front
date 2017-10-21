import React, {Component} from 'react';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';
import DisplayFriends from './DisplayFriends';
import PopulateRequests from './PopulateRequests';
import user from '../../lib/user';
import { LoaderPage } from '../ui/Loader';



import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockServer("/user/p/1"),
        }
    
    }

    componentWillMount(){
        this.getUser();
    }

    async getUser() {
        if(this.props.match){
            const u = await user(this.props.match.params.username);
            console.log("u:", u);
            this.setState({
                user: u
            })
        }
    }


    getHeading(u) {
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    <img src={this.state.data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{u.Username}</h4>
                    {/* <RSBLabel
                        name={this.state.data.numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    /> */}
                    <span>Full Name: {u.Firstname} {u.Lastname}</span>
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

    getFriends(u) {
        console.log("Getting user for: ", u);
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={this.state.data.result[0].Friends}
                    />
                </div>
            </div>
        );
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
        if(this.state.user == null){
            return <LoaderPage />
        } else {
            console.log("State: ", this.state.user);
            
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                {this.getHeading(this.state.user)}
                <div className="row">
                    {this.getFriends(this.state.user.username)}
                    {this.getGameHistory(this.state.user.username)}
                </div>
            </div >
            )
        }
    }
}

export default Profile;
