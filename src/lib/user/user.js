import dummy from '../../dummy/allUsers';
import yoda, { YodaRequest } from '../yoda/yoda';
import redirect from '../navigator';
import session from '../session';
import errorFormatter from '../errors';
import { showError } from '../../mixins/notifiable';

function _handleError(error) {
    return { error: errorFormatter(error) };
}

//  async function _getUser(username) {
//     return await new Promise((res, rej) => {
//         setTimeout(() => {
//             res(dummy.result.find((u) => {
//                 return (u.Username === username)
//             }))
//         }, 2000)
//     })
// }


export async function _getUserInfo(username) {
    const res = await yoda.post('/user/p/0', (new YodaRequest({}, {
        username: username,
    })).toString(), true);
    if (res.error) {
        const err = _handleError(res.data);
        showError({ message: err.error });
        redirect();
    }
    const u = session.getItem("username");
    redirect({ path: `/user/${u}` });  //TODO: This shouldn't be necessary if the path in Home/view sends them there
    return res.data;
}


export default _getUserInfo;