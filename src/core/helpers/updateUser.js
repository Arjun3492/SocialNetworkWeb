import firebase, { db } from './firebase.config';
import { getCurrentUser } from './firebaseAuth';

const followUser = async (userId) => {
    try {
        const user = await getCurrentUser();
        const currentUserRef = await db
            .collection("users").doc(user.uid);
        await currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayUnion(userId)
        });
        const userRef = await db
            .collection("users").doc(userId);
        await userRef.update({ followers: firebase.firestore.FieldValue.arrayUnion(user.uid) });
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

const unfollowUser = async (userId) => {
    try {
        const user = await getCurrentUser();
        const currentUserRef = await db
            .collection("users").doc(user.uid);
        await currentUserRef.update({
            following: firebase.firestore.FieldValue.arrayRemove(userId)
        });
        const userRef = await db
            .collection("users").doc(userId);
        await userRef.update({ followers: firebase.firestore.FieldValue.arrayRemove(user.uid) });
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

const postIncrement = async (userId) => {
    try {
        const currentUserRef = await db
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
        const currentUserRef = await db
            .collection("users").doc(userId);
        await currentUserRef.update({
            posts: firebase.firestore.FieldValue.increment(-1)
        });

        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}
export { followUser, unfollowUser, postIncrement, postDecrement };