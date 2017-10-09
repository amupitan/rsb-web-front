import session from '../session';

// const Game = session.getItem('game');


// TODO: I think the function is very bad. Look for a better way to write it
export default async function () {
    // while (!session.getItem('game')) {
    //     console.log(session.getItem('game'));
    // }
    setTimeout(function () {
        //your code here...
    }, 7000);
    return Promise.resolve(session.getItem('game'));
}