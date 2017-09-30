import userWithFriends from './user';

export default (url)=>{
    switch (url){
        case "/user/p/1" :
            return userWithFriends
        default:
            return {}
    }
        
}