import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import DisplayFriends from '../ProfileUser/DisplayFriends';

import './style.css';

class ViewUser extends Component{
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);   
        this.getUser = this.getUser.bind(this); 
        console.log("In here, ", props);    
    }
    
    getUser(){
        console.log("Username: ", this.props.match.params.username);
    }

    heading() {
        let numFriends = "Friends " + this.props.userInfo.Friends.length;
        let isFriend = ()=>{
            //TODO This is where I iterate through the user's friends list and check if 
            // the current user is one of them
            return true;   
        };

        let actionButt = (<RSBButton
            text={(isFriend()? "Unfriend": "Send Request")}
            onClickFunction={()=>{console.log("hi")}}
            buttonType= {isFriend() ? "danger" : "info"}
            />)
        
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    <img src={this.props.userInfo.ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{this.props.userInfo.Username}</h4>
                    <RSBLabel
                        name={numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    />
                    <span>Full Name: {this.props.userInfo.Firstname} {this.props.userInfo.Lastname}</span>
                    {actionButt}
                </div>
            </div>
        )
    }

    Friends() {
        this.getUser();
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={this.props.userInfo.Friends}
                    />
                </div>
            </div>
        );
    }

    GameHistory() {
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
    render(){
        return (
        <div className="panel col-xs-10 col-xs-offset-1">
            {this.heading()}
            <div className="row">
                {this.Friends()}
                {this.GameHistory()}
            </div>
        </div >
        
    )}
}

export default ViewUser
