import React from 'react';

import RSBButton from '../ui/RSBButton';
import defaultImg from '../../dummy/default.jpg';


function UserRequests(props) {
    const userRequestsElement = () => {
        let userRequests = [];
        props.info.forEach((el, i) => {
            let displaySport
            if (el.Sport) {
                displaySport = <span><i>{el.Sport}</i></span>;
            }
            userRequests.push(
                <div key={i} className="populate-requests row">
                    <div className="col-sm-4 col-sm-pull">
                        <img src={el.profilePic || defaultImg} alt="Profile" className="profile-pic-xs" />
                    </div>
                    <div className="col-sm-4">
                        <span>{el.username}</span><br />
                        <span>{el.firstname} {el.lastname}</span><br />
                        {displaySport}<br />
                        <span>{el.Time}</span>
                    </div>
                    <ReviewRequest accept />
                    <ReviewRequest accept={false} />
                </div>);
        });
        return userRequests;
    }

    return <div>{userRequestsElement()}</div>;

}

const ReviewRequest = ({ accept = false }) => {
    const { glyph, className } = accept ?
        { glyph: 'ok', className: 'accept' } :
        { glyph: 'remove', className: 'decline' };

    return (
        <div className="col-sm-2">
            <RSBButton
                glyphicons={`glyphicon glyphicon-${glyph}`}
                className={className}
                onClickFunction={() => {
                    console.log("Accept!");
                }}
            />
        </div>
    );
}


export default UserRequests;