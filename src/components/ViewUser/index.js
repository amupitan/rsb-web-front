import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import DisplayFriends from '../ProfileUser/DisplayFriends';


import user from '../../lib/user';

import './style.css';

class ViewUser extends Component{
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);   
        this.getUser = this.getUser.bind(this); 
        console.log("In here, ", props);    
    }
    
    getUser(username){
        let use = new user().getAllUsers().result;
        

        return use.find((u)=>{
            return (u.Username === username);
        })
    }

    heading(u) {
        let numFriends = "Friends " + u.Friends.length;
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
                    <img src={u.ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{u.Username}</h4>
                    <RSBLabel
                        name={numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    />
                    <span>Full Name: {u.Firstname} {u.Lastname}</span>
                    {actionButt}
                </div>
            </div>
        )
    }

    Friends(u) {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={u.Friends}
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
        const userInstance = this.getUser(this.props.match.params.username);        
        console.log("UserInstance: ", userInstance)
        return (
        <div className="panel col-xs-10 col-xs-offset-1">
            {this.heading(userInstance)}
            <div className="row">
                {this.Friends(userInstance)}
                {this.GameHistory(userInstance)}
            </div>
        </div >
        
    )}
}

export default ViewUser
