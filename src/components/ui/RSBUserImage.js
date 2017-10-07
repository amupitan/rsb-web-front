import React, { Component } from 'react';
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

class RSBButton extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            name: prop.name,
            imgUrl: prop.imgUrl,
            imgHeight: prop.imgHeight,
            imgWidth: prop.imgWidth,
            modalName: prop.modalName,
            className: prop.className
        }
    }

    render() {
        return (
            <div className={this.state.className}  >
                <img className="rsb-friend-icon" alt="" src={this.state.imgUrl} height={this.state.imgHeight} width={this.state.imgWidth} />
                <RSBLabel
                    name={this.state.name}
                    className="rsb-friend-link"
                    onClickFunction={() => {
                        console.log("Clicked on " + this.state.name )
                    }}
                />
            </div>
        );
    }
}

export default RSBButton;