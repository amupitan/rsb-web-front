import React from 'react';
import user from '../../lib/user';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';
import DisplayFriends from '../ProfileUser/DisplayFriends';

//Get every user in the db to see if it matches anyone


export function getHeading(u) {
    let numFriends = "Friends " + u.Friends.length;
    let isFriend = () => {
        //TODO This is where I iterate through the user's friends list and check if 
        // the current user is one of them
        return true;
    };

    let actionButt = (<RSBButton
        text={(isFriend() ? "Unfriend" : "Send Request")}
        onClickFunction={() => { console.log("hi") }}
        buttonType={isFriend() ? "danger" : "info"}
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

export function getFriends(u) {
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

export function getGameHistory(u) {
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