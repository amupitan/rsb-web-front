import dummy from '../../dummy/allUsers';

 async function _getUser(username) {
    return await new Promise((res, rej) => {
        setTimeout(() => {
            res(dummy.result.find((u) => {
                return (u.Username === username)
            }))
        }, 2000)
    })
}

export default _getUser;