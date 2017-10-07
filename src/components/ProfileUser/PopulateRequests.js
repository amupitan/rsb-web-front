import React from 'react';
import RSBButton from '../ui/RSBButton';

function PopulateRequests(props) {
    function iterateInfo() {
        let putas = [];
        props.info.forEach((el, i) => {

            putas.push(
                <div key={i} className="populate-requests row">
                    <div className="col-sm-4 col-sm-pull">
                        <img src={el.ProfilePic} alt="Profile" className="profile-pic-sm" />
                    </div>
                    <div className="col-sm-4">
                        <span>{el.Username}</span>
                    </div>
                    <div className="col-sm-2">
                        <RSBButton
                            glyphicons="glyphicon glyphicon-ok"
                            className="accept"
                            onClickFunction={() => {
                                console.log("Accept!");
                            }}
                        />
                    </div>
                    <div className="col-sm-2">
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
        return putas;
    }

    return (
        <div>
            <h2>FriendRequests are here {iterateInfo()}</h2>
        </div>
    );
}


export default PopulateRequests;