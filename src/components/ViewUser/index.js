import React, {Component} from 'react';
import {getHeading, getFriends, getGameHistory } from './controller';
import user from '../../lib/user';


import './style.css';

class ViewUser extends Component{
    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
    }

    componentWillMount(){

    }

    render(){
        let userInstance = {};
        let returnable;
        try{
             userInstance = user.getUser(this.props.match.params.username);
             while(!userInstance){
                 console.log("User doesnt exist")
             }
             console.log("In use", userInstance);
            returnable = (
                <div className="panel col-xs-10 col-xs-offset-1">
                {getHeading(userInstance)}
                <div className="row">
                    {getFriends(userInstance)}
                    {getGameHistory(userInstance)}
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
