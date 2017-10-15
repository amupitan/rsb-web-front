import dummy from '../../dummy/allUsers';

export default class User {
    static getUser(username){
        return dummy.result.find((u) => {
            return (u.Username === username)
        })
    }
};