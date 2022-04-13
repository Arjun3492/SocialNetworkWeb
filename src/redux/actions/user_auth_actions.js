//THIS THUNK MIDDLEWARE IS TO RUN ASYNC FUNCTIONS AND CALL A DISPATCH

import { signInWithFacebook, signInWithGoogle, signOut } from '../../core/helpers/firebaseAuth';
import { login, error, logout } from './async_action'
const signInFacebook = () => {
    return async (dispatch) => {
        try {
            const user = await signInWithFacebook();
            dispatch(login(user));
            window.location = '/home'
        } catch (err) {
            dispatch(error(err));
        }
    }
}

const signInGoogle = () => async (dispatch) => {
    try {
        const user = await signInWithGoogle();
        dispatch(login(user));
        window.location = '/home'
    } catch (err) {
        dispatch(error(err));
    }
}
const signOutUser = () => async (dispatch) => {
    try {
        await signOut();
        dispatch(logout);
        window.location = '/login'
    } catch (err) {
        dispatch(error(err));
    }
}
export { signInGoogle, signInFacebook, signOutUser }