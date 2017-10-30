import React from 'react';
import { Link } from 'react-router-dom';

import RSBButton from '../ui/RSBButton';
import Avatar from '../ui/Avatar';

export default ({ friends }) => {

    const users = friends.map(({ username, avatar }, i) => {

        return (
            <div className="populate-requests row" key={i}>
                <div className="col-sm-4 col-sm-pull">
                    <Link to={`/user/${username}`} >
                        <Avatar avatar={avatar} alt='profile-pic' className='profile-pic-xs' />
                    </Link>
                </div>
                <div className="col-sm-4">
                    <Link to={`/user/${username}`}>
                        {username}
                    </Link>
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
            </div >
        );
    });


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