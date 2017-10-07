import React from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import mockServer from '../../dummy';
import DisplayFriends from '../ProfileUser/DisplayFriends';

import './style.css';

function ProfileUser() {
    let data = mockServer("/user/TODO");
    let numFriends = "Friends " + data.result[0].Friends.length;



    function heading() {
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
                    <img src={data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{data.result[0].Username}</h4>
                    <RSBLabel
                        name={numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    />
                    <span>Full Name: {data.result[0].Firstname} {data.result[0].Lastname}</span>
                    {actionButt}
                </div>
            </div>
        )
    }

    function Friends() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={data.result[0].Friends}
                    />
                </div>
            </div>
        );
    }

    function GameHistory() {
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
    return (
        <div className="panel col-xs-10 col-xs-offset-1">
            {heading()}
            <div className="row">
                {Friends()}
                {GameHistory()}
            </div>
        </div >
    )
}

export default ProfileUser
