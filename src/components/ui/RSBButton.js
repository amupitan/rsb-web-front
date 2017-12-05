import React from 'react';

/**
 * How to use: 
 * 
 * Props that are suggested to pass in: 
 *      text: The text value of the button
 *      buttonType: bootstrap class name for button
 *          examples: "default", "primary", "success", "warning", "danger" or "info" 
 *               *** It's a better way to style your buttons through css and pass in that class name rather than
 *                   use buttonType. This is because we don't want to be too dependant on bootstrap ***
 *      onClickFunction: Function you want the button to execute when it is pressed.
 *       modalName: This is for if you want a modal to pop up when you press it
 *      className: Pass in a class name
 *
 * 
 * Can add more later
 *      
 * 
 * Optional:
 *      glyphicons: display a glyphicon
 *          example: "glyphicon glyphicon-music" 
 *              Yes, put the entire string. Find them https://bootstrapdocs.com/v3.3.5/docs/components/#btn-groups
 *      
 * 
 * USAGE EXAMPLE:
 * <RSB_Button 
        text="A RSB button"
        buttonType= "danger"
        onClickFunction={this.handleClick}
        glyphicons="glyphicon glyphicon-music"
        modalName: "FriendsList"
        className: "close"
    />
 * 
 */

const RSBButton = ({ text, buttonType, onClickFunction, glyphicons, modalName, className }) => {
    return (
        <div>
            <button type="button"
                style={{ boxShadow: '1px 5px 5px rgb(78, 83, 79)' }}
                className={"btn btn-" + buttonType + " " + glyphicons + " " + className}
                onClick={onClickFunction}
                data-toggle="modal" data-target={"#" + modalName}

            >{text}</button>
        </div>
    );
}

export default RSBButton;
