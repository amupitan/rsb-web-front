import React, { Component } from 'react';

import RSBButton from '../ui/RSBButton';

class AddOrRemove extends Component {
    //We are checking buttonStatus, which will swap: add, remove, pending
    //if buttonStatus == 0, pending
    //1 -> add, 2 -> remove


    constructor(props) {
        super(props);

        this.state = {
            buttonStatus: -1,
        }

        this.render = this.render.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    onAddClick() {
        //TODO: call for friend request

        this.setState({
            buttonStatus: 0
        });
    }

    onRemoveClick() {
        //TODO: call for remove friend

        this.setState({
            buttonStatus: 1
        });
    }

    componentWillMount() {
        //TODO: backend call to check if friends
        //if friends, set buttonState to 'add'
        //if not friends, check if there is a friend request pending
        //if they are friends AND there is a pending request and the currentUser sent it, set buttonState to 'pending'
        //if they are just friends, set buttonState to 'remove'

        this.setState({
            buttonStatus: 2,
        });

    }


    render() {
        let buttonInfo = {};
        const curButton = this.state.buttonStatus;
        if (curButton === 2) {
            buttonInfo = { text: ' Unfriend', buttonType: "danger", glyphicons: "glyphicon glyphicon-minus", onClickFunction: this.onRemoveClick };
        }
        else if (curButton === 1) {
            buttonInfo = { text: ' Add', buttonType: "success", glyphicons: "glyphicon glyphicon-plus", onClickFunction: this.onAddClick };
        }
        else {
            buttonInfo = { text: ' Pending', buttonType: "info", glyphicons: "glyphicon glyphicon-envelope", onClickFunction: '' };
        }

        return (
            <div className="text-center rsb-add-or-remove-btn">
                <RSBButton
                    text={buttonInfo.text}
                    glyphicons={buttonInfo.glyphicons}
                    onClickFunction={buttonInfo.onClickFunction}
                    buttonType={buttonInfo.buttonType}
                />
            </div>
        );
    }

}

export default AddOrRemove;