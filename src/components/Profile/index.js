import React, { Component } from 'react';

import user, { getLoggedInUserName, uploadProfilePhoto, reviewFriendRequest, FriendStatus, getGameHistory } from '../../lib/user';
import constraints from '../../lib/constraints';
import { showSuccess } from '../../mixins/notifiable';
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';
import UserAction from './UserAction';

import './style.css';

class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.handleUserActionClick = this.handleUserActionClick.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleFriendRequest = this.handleFriendRequest.bind(this);
        this.displaySuccess = this.displaySuccess.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.username === nextProps.match.params.username) return;
        this.getUserInfo(nextProps.match.params);
    }

    async handleFriendRequest({ username, accept }) {
        const res = await reviewFriendRequest({ username, accept });
        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }

        this.displaySuccess();
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params);
    }

    async handleChangePhoto(evt) {
        const file = evt.target.files.length > 0 && evt.target.files[0];
        if (!file) return;

        if (file.size > constraints.MAX_FILE_SIZE) {
            this.setState({ errorMessage: `The file size must be under ${constraints.MAX_FILE_SIZE / (1024 * 1024)} MB` });
            return;
        }

        const name = file.name;
        if (!name.endsWith('.png') && !name.endsWith('.jpg') && !name.endsWith('.jpeg')) {
            this.setState({ errorMessage: 'The image must be a .png, .jpg or .jpeg' });
            return;
        }

        const res = await uploadProfilePhoto(file);
        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }

        this.displaySuccess({ message: 'Your profile picture was updated successfully' })
    }

    async handleUserActionClick(clickResponse) {
        if (!clickResponse) return;

        if (clickResponse.error) {
            this.setState({ errorMessage: clickResponse.error });
            return;
        }

        this.displaySuccess();
    }

    async getUserInfo({ username = getLoggedInUserName() }) {
        var userInfo = await user({ username, populate: 1 });

        if (userInfo.error) {
            // TODO: might want to handle error. It's already handled tho
            return console.error(userInfo);
        }

        const gameHistory = await getGameHistory(username);
        if (gameHistory.error) {
            return console.log(gameHistory);
        }

        this.setState({
            user: userInfo,
            friends: userInfo.friends || [],
            gameHistory: gameHistory.res,
            errorMessage: null,
        });
    }

    displaySuccess({ message = 'Success!' } = {}) {
        showSuccess(message);
        this.getUserInfo({ username: this.state.user.username });
    }

    render() {
        if (!this.state || this.state.user == null) return <LoaderPage />;

        const { user, errorMessage } = this.state;
        const isMe = user.friendStatus === FriendStatus.IS_USER;
        return (
            <div className="panel col-xs-10 col-xs-offset-1">
                <Heading onImageChange={isMe && this.handleChangePhoto} {...user} errorMessage={errorMessage} />
                <UserAction status={user.friendStatus} onClick={this.handleUserActionClick} username={user.username} />
                <div className="row">
                    <FriendsList {...this.state} />
                    <GameHistory {...this.state.gameHistory} />
                </div>
                {
                    isMe &&
                    <div className="row">
                        <FriendRequest {...user} onReview={this.handleFriendRequest} />
                        <GameInvites {...user} />
                    </div>
                }
            </div >
        );

    }
}

export default Profile;