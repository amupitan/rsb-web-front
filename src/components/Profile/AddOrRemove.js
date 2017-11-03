import React, { Component } from 'react';
import { getUser, removeFriend, sendFriendRequest } from '../../lib/user';
import { getLoggedInUserName, FriendStatus } from '../../lib/user';

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
        let buttonVal = -1;
        if (status === FriendStatus.ARE_FRIENDS) {
            buttonVal = 2;
        }
        else if (status === FriendStatus.RECEIVED_R || status === FriendStatus.SENT_R) {
            buttonVal = 0;
        }
        else {
            buttonVal = 1;
        }
        this.setState({
            friendStatus: status,
            buttonStatus: buttonVal
        });
    }

    onAddClick() {
        sendFriendRequest(this.props.currentUsername);
        this.setState({
            buttonStatus: 0,
            friendStatus: FriendStatus.SENT_R
        });
    }

    onRemoveClick() {
        removeFriend(this.props.currentUsername);
        this.setState({
            buttonStatus: 1,
            friendStatus: null,
        });
    }

    componentWillMount() {
        this.getThisUser();
    }

    render() {
        let buttonInfo = {};
        const curButton = this.state.buttonStatus;

        if (this.props.currentUsername === getLoggedInUserName()) {
            return null;
        }

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