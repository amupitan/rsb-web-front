import dummy from '../../dummy/allUsers';

export default async function getUser(username) {
    return await new Promise((res, rej) => {
        setTimeout(() => {
            res(dummy.result.find((u) => {
                return (u.Username === username)
            }))
        }, 2000)
    })
}
