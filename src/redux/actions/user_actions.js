//THIS THUNK MIDDLEWARE IS TO RUN ASYNC FUNCTIONS AND CALL A DISPATCH

import { signInWithFacebook, signInWithGoogle, signOut } from '../../core/services/firebase_auth';
import { follow, getUser, unfollow } from '../../core/services/user';
import { LOGIN_USER, ERROR, LOGOUT_USER, FOLLOW_USER, UNFOLLOW_USER } from './async_action'

const signInFacebook = () => {
    return async (dispatch) => {
        try {
            await signInWithFacebook();
            window.location = '/home'
        } catch (err) {
            dispatch(ERROR(err));
        }
    }
}

const signInGoogle = () => async (dispatch) => {
    try {
        await signInWithGoogle();
        window.location = '/home'
    } catch (err) {
        dispatch(ERROR(err));
    }
}
const signOutUser = () => async (dispatch) => {
    try {
        await signOut();
        dispatch(LOGOUT_USER);
        window.location = '/login'
    } catch (err) {
        dispatch(ERROR(err));
    }
}

const followUser = (userID) => async (dispatch) => {
    try {
        const user = await follow(userID);
        dispatch(FOLLOW_USER(user));
    } catch (err) {
        dispatch(ERROR(err));
    }
}
const unfollowUser = (userID) => async (dispatch) => {
    try {
        const user = await unfollow(userID);
        dispatch(UNFOLLOW_USER(user));
    } catch (err) {
        dispatch(ERROR(err));
    }
}
export { signInGoogle, signInFacebook, signOutUser, followUser, unfollowUser }