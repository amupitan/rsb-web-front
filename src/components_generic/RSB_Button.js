import React, { Component } from 'react';

/**
 * How to use: 
 * 
 * Props that are suggested to pass in: 
 *      text: The text value of the button
 *      buttonType: bootstrap class name for button
 *          examples: "default", "primary", "success", "warning", "danger" or "info" 
 *      onClickFunction: Function you want the button to execute when it is pressed.
 * 
 * We can add more later
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
    />
 * 
 */

 //TODO use openModal in the modal creation thing 

class RSB_Button extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            text: prop.text,
            buttonType: prop.buttonType,
            onClickFunction: prop.onClickFunction ? prop.onClickFunction : " ",
            glyphicons: prop.glyphicons ? prop.glyphicons : " ",
            openModal: prop.openModal ? `data-toggle="modal" data-target="#myModal"`: " ",
            modalName: prop.modalName
        }
    }

    render() {
        return (
            <div>
                <button type="button" 
                        className={"btn btn-" + this.state.buttonType + " " + this.state.glyphicons} 
                        onClick={this.state.onClickFunction}
                        data-toggle="modal" data-target={"#"+ this.state.modalName}
                        
                        >{this.state.text}</button>
            </div>
        );
    }
}

export default RSB_Button;
