import React from 'react';

function PopulateRequests(props) {
    function iterateInfo(){
        let putas;
        props.info.forEach((el, i) => {
            putas += el.Username;
        }, this);
        return putas;
    }

    return (
        <div>
            <h2>FriendRequests are here {iterateInfo()}</h2>
        </div>
    );
}


export default PopulateRequests;