import React from 'react';
import { Link } from 'react-router-dom';
import RSBButton from '../ui/RSBButton';

export default ({ friends, defaultImg }) => {
    let users = [];
    for (let i in friends) {
        users.push(
            <div className="populate-requests row" key={i}>
                <div className="col-sm-4 col-sm-pull">
                    <span className="">
                        <Link to={`/user/${friends[i].username}`} >
                            <img src={friends[i].ProfilePic || defaultImg} alt="Profile" className="profile-pic-xs" />
                        </Link>
                    </span>
                </div>
                <div className="col-sm-4">
                    <span className="">
                        <Link to={`/user/${friends[i].username}`}>
                            {friends[i].username}
                        </Link>
                    </span>
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
            </div >);

        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    {users}
                </div>
            </div>
        );
    }
}