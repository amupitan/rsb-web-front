import React, { Component } from 'react';

import user, { getLoggedInUserName, uploadProfilePhoto, handleFriendRequest, FriendStatus } from '../../lib/user';
import constraints from '../../lib/constraints';
import { showSuccess } from '../../mixins/notifiable';
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';
import UserAction from './AddOrRemove';

import './style.css';

class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.state = {
            isCurrentUser: false,
        }

        this.handleUserActionClick = this.handleUserActionClick.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleFriendRequest = this.handleFriendRequest.bind(this);
        this.refreshUser = this.refreshUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.username === nextProps.match.params.username) return;
        this.getUserInfo(nextProps.match.params);
        if (nextProps.match.params.username !== getLoggedInUserName()) {
            this.state = {
                isCurrentUser: false,
            }
        }
    }

    async handleFriendRequest(event) {
        await handleFriendRequest(event.username, event.accept);
        await this.getUserInfo(this.state.user.username);
    }

    refreshUser() {
        this.getUserInfo(this.props.match.params);
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
            this.setState({ errorMessage: 'The image must be a .png, ,jpg or .jpeg' });
            return;
        }

        const res = await uploadProfilePhoto(file);
        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }

        showSuccess('Your profile picture was updated successfully');
        this.getUserInfo({ username: this.state.user.username });
    }

    async handleUserActionClick(clickResponse) {
        if (clickResponse.error) {
            this.setState({ errorMessage: clickResponse.error });
            return;
        }

        showSuccess('Success!');
        await this.getUserInfo({ username: this.state.user.username });
    }

    async getUserInfo({ username = getLoggedInUserName() }) {
        var userInfo = await user({ username, populate: 1 });

        if (userInfo.username === getLoggedInUserName()) {
            this.setState({ isCurrentUser: true });
        }
        if (userInfo.error) {
            // TODO: might want to handle error. It's already handled tho
            return console.error(userInfo);
        }

        this.setState({
            user: userInfo,
            friends: userInfo.friends || [],
            errorMessage: null,
        });
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
                    <GameHistory {...user.username} />
                </div>
                {
                    isMe &&
                    <div className="row">
                        <FriendRequest {...user} handleClick={this.handleFriendRequest} />
                        <GameInvites {...user} />
                    </div>
                }
            </div >
        );

    }
}

export default Profile;