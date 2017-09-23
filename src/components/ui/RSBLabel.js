import React from 'react';
import './style/HamburgerMenu.css';

/**
 * How to use: 
 * 
 * Props that are suggested to pass in: 
 *      name: The text value of the label
 *      className: Class that the label will use. Make sure to import the file that has that class defined into this file
 *      onClickFunction: Function you want the button to execute when it is pressed.
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
    />
 * 
 */

function RSBLabel(props) {
    return (
        <div>
            <span onClick={props.onClickFunction} className={props.styleClass}>
                {props.name}
            </span>
        </div>
    )
}

export default RSBLabel;
