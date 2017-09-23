import React from 'react';

/**
 * How to use: 
 * 
 * Props that are suggested to pass in: 
 *      name: The text value of the label
 *      className: Class that the label will use. 
 *          The style associated with that class just has to be accessable in the component that uses  RSBLabel. Not in RSBLabel itself
 *      onClickFunction: Function you want the button to execute when it is pressed.
 *      modalName: This is for if you want a modal to pop up when you press it
 * 
 * We can add more later
 *      
 * 
 * USAGE EXAMPLE:
 * <RSBLabel 
        name="A RSB Label"
        className= "danger"
        onClickFunction={()=>{
            console.log("Foo");
        }}
        modalName: "FriendsList"
    />
 * 
 */

function RSBLabel(props) {
    return (
        <div>
            <span 
                onClick={props.onClickFunction} 
                className={props.styleClass}
                data-toggle="modal" data-target={"#"+ props.modalName}>
                {props.name}
            </span>
        </div>
    )
}

export default RSBLabel;
