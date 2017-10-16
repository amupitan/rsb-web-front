import dummy from '../../dummy/allUsers';

export default class User {
    //make this asyc
    static getUser(username){
        return dummy.result.find((u) => {
            return (u.Username === username)
        })
    }
};