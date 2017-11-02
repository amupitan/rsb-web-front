import React, { Component } from 'react';
import user, { getUser, removeFriend, sendFriendRequest } from '../../lib/user';

import RSBButton from '../ui/RSBButton';

class AddOrRemove extends Component {
    //We are checking buttonStatus, which will swap: add, remove, pending
    //if buttonStatus == 0, pending
    //1 -> add, 2 -> remove


    constructor(props) {
        super(props);

        this.state = {
            buttonStatus: -1,
            friendStatus: null,
        }

        this.render = this.render.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.getThisUser = this.getThisUser.bind(this);
    }

    async getThisUser() {
        const res = await getUser({ username: this.props.currentUsername });
        const status = res.friendStatus;
        this.setState({
            friendStatus: status,
        });
    }

    onAddClick() {
        sendFriendRequest(this.props.currentUsername);
        this.setState({
            buttonStatus: 0
        });
    }

    onRemoveClick() {
        removeFriend(this.props.currentUsername);
        this.setState({
            buttonStatus: 1
        });
    }

    componentWillMount() {
        this.getThisUser();
    }

    componentWillUpdate() {
        //check the button status so the function doesn't continuously rerender
        if (this.state.friendStatus === "areFriends" && this.state.buttonStatus !== 2) {
            this.setState({
                buttonStatus: 2,
            });
        }
        else if ((this.state.friendStatus === "receivedRequest" || this.state.friendStatus === "sentRequest") && this.state.buttonStatus !== 0) {
            this.setState({
                buttonStatus: 0,
            });
        }
        else if (this.state.friendStatus == null && this.state.buttonStatus !== 1) {
            this.setState({
                buttonStatus: 1,
            });
        }
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