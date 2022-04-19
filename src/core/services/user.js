import firebase, { db } from '../firebase_config';
import { getCurrentUser } from './firebase_auth';


const getUser = async (userId) => {
    try {
        const userRef = db
            .collection("users").doc(userId);
        return (await userRef.get()).data();
    } catch (err) {
        throw new Error(err.message);

    }
}

const follow = async (userId) => {
    try {
        const user = await getCurrentUser();
        const currentUserRef = db
            .collection("users").doc(user.uid);
        await currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayUnion(userId)
        });
        const userRef = db
            .collection("users").doc(userId);
        if (user.uid !== userId)
            await userRef.update({ followers: firebase.firestore.FieldValue.arrayUnion(user.uid) });
        return userRef.get();
    } catch (err) {
        throw new Error(err.message);
    }
}

const unfollow = async (userId) => {
    try {
        const user = await getCurrentUser();
        const currentUserRef = db
            .collection("users").doc(user.uid);
        await currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayRemove(userId)
        });
        const userRef = db
            .collection("users").doc(userId);
        await userRef.update({ followers: firebase.firestore.FieldValue.arrayRemove(user.uid) });
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

const postIncrement = async (userId) => {
    try {
        const currentUserRef = db
            .collection("users").doc(userId);
        await currentUserRef.update({
            posts: firebase.firestore.FieldValue.increment(1)
        });

        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

const postDecrement = async (userId) => {
    try {
        const currentUserRef = db
            .collection("users").doc(userId);
        await currentUserRef.update({
            posts: firebase.firestore.FieldValue.increment(-1)
        });

        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}
export { follow, unfollow, postIncrement, postDecrement, getUser, };