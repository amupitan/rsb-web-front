import React, {Component} from 'react';
import {getHeading, getFriends, getGameHistory } from './controller';
import user from '../../lib/user';
import { LoaderPage } from '../ui/Loader';



import './style.css';

class ViewUser extends Component{
    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentWillMount(){
        this.getUser();
    }

    async getUser() {
        const u = await user(this.props.match.params.username);
        this.setState({
            userObj: u
        })
    }

    render(){
        try{
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                {getHeading(this.state.userObj)}
                <div className="row">
                    {getFriends(this.state.userObj)}
                    {getGameHistory(this.state.userObj)}
                </div>
            </div >
            )
        } catch(e){
            return <LoaderPage />
        }
    }

}

export default ViewUser
