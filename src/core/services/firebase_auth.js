// import { Subject } from 'rxjs';

import firebase, { auth, db } from "../firebase_config";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// const authState = async () => {
//     try {
//         const subject = new Subject();
//         subject.next(auth.onAuthStateChanged(user => { return user }))
//         return subject.asObservable;
//         //    return auth.onAuthStateChanged(user => { return user })
//     }
//     catch (err) {
//         throw new Error(err.message)
//     }
// }

//Sign in with Google
const signInWithGoogle = async () => {
    try {
        const userCredential = await auth.signInWithPopup(googleProvider);
        const user = userCredential.user;
        const query = await db
            .collection("users").doc(user.uid)
            .get();
        if (!query.exists) {
            await db.collection("users").doc(user.uid).set({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL: user.photoURL,
                following: [],
                followers: [],
                posts: 0
            });
        }
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (err) {
        throw new Error(err.message)
    }
};

//Sign in with Facebook
const signInWithFacebook = async () => {
    try {
        const userCredential = await auth.signInWithPopup(facebookProvider);
        const user = userCredential.user;
        const query = await db
            .collection("users").doc(user.uid)
            .get();
        if (!query.exists) {
            await db.collection("users").doc(user.uid).set({
                uid: user.uid,
                name: user.displayName,
                authProvider: "facebook",
                email: user.email,
                photoURL: user.photoURL,
                following: [],
                followers: [],
                posts: 0
            });
        }
        localStorage.setItem('user', JSON.stringify(user));
        return user;

    } catch (err) {
        throw new Error(err.message)

    }
};

//SignOut current user
const signOut = async () => {
    try {
        auth.signOut().then(() => {
            localStorage.removeItem('user');
            return null
        })
    }
    catch (err) {
        throw new Error(err.message)
    }
}

const getCurrentUser = async () => {
    try {
        var user = await JSON.parse(localStorage.getItem('user'));
        if (user)
            return user;
        const userCredential = auth.currentUser
        if (userCredential)
            user = userCredential.user;
        return user;
    }
    catch (err) {
        throw new Error(err.message)
    }
}
export { signInWithGoogle, signInWithFacebook, signOut, getCurrentUser }