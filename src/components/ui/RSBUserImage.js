import React from 'react';
import RSBLabel from "./RSBLabel";

/**
 * How to use: 
 * 
 * Props that are suggested to pass in: 
 *      userName: The username of the player who will be displayed
 *      imgUrl: the url of the users profile picture
 *      imgHeight: height of the profile pic
 *      imgWidth: length of the profile picture
 *      className: Pass in a class name
 *
 * 
 * Can add more later
 *      
 * 
 * 
 * USAGE EXAMPLE:
 * <RSB_UserImage 
        userName="vicluvskern69"
        imgUrl="www.pic.com"
        imgHeight: "40px"
        imgWidth = "34em"
        className: "close"
    />
 * 
 */

function RSBUserImage(props) {
    return (
        <div className={props.className}  >
            <img className="rsb-friend-icon" alt="" src={props.imgUrl} height={props.imgHeight} width={props.imgWidth} />
            <RSBLabel
                name={props.name}
                className="rsb-friend-link"
                onClickFunction={() => {
                    console.log("Clicked on " + props.name)
                }}
            />
        </div>
    );
}

export default RSBUserImage;