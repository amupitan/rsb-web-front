import React from 'react';
import RSBButton from '../ui/RSBButton';
import defaultImg from '../../dummy/default.jpg';


function PopulateRequests(props) {
    function iterateInfo() {
        let putas = [];
        props.info.forEach((el, i) => {
            let displaySport
            if (el.Sport) {
                displaySport = <span><i>{el.Sport}</i></span>;
            }
            putas.push(
                <div key={i} className="populate-requests row">
                    <div className="col-sm-4 col-sm-pull">
                        <img src={el.Image || defaultImg} alt="Profile" className="profile-pic-xs" />
                    </div>
                    <div className="col-sm-4">
                        <span>{el.username}</span><br />
                        <span>{el.firstname} {el.lastname}</span><br />
                        {displaySport}<br />
                        <span>{el.Time}</span>
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
            {iterateInfo()}
        </div>
    );
}


export default PopulateRequests;