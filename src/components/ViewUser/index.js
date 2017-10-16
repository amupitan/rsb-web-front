import React, {Component} from 'react';
import {getHeading, getFriends, getGameHistory } from './controller';
import user from '../../lib/user';


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
        console.log("U: ", u);
        this.setState({
            userObj: u
        })
    }

    render(){
        let returnable;

        try{
             console.log("this.state.userObj: ", this.state.userObj)
            returnable = (
                <div className="panel col-xs-10 col-xs-offset-1">
                {getHeading(this.state.userObj)}
                <div className="row">
                    {getFriends(this.state.userObj)}
                    {getGameHistory(this.state.userObj)}
                </div>
            </div >
            )
        } catch(e){
            returnable = (<h3>Invalid user or some sh*t like that</h3>)
        }
    
        return returnable;
    }

}

export default ViewUser
