import { getCurrentUser } from './firebase_auth';
import { postDecrement, postIncrement } from './user';
import firebase, { db, storage } from '../firebase_config';
import uniqid from 'uniqid';

const storageRef = storage.ref();
const uploadPost = async (title, file) => {
    try {
        const user = await getCurrentUser();
        const colRef = db.collection("post");
        const postId = uniqid();
        var postData;
        if (file) {
            const imageRef = await uploadFile(file);
            const imageUrl = await imageRef.getDownloadURL();
            postData = {
                title: title,
                postId: postId,
                userId: user.uid,
                userName: user.displayName,
                imageUrl: imageUrl,
                fileName: file.name,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        } else {
            postData = {
                title: title,
                postId: postId,
                userId: user.uid,
                userName: user.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        }
        await colRef.add(postData);
        await postIncrement(user.uid);
        return true;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const getUserPosts = async (userId) => {
    try {
        const querySnapshot = await db.collection("post").where("userId", "==", userId).get();
        return querySnapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

const getRecentPosts = async () => {
    try {
        return new Promise((res, rej) => {
            db.collection("post").orderBy("createdAt", "desc").limit(10).onSnapshot((snapshot) => {
                let updatedData = snapshot.docs.map(doc => doc.data())
                res(updatedData);
            })
        })
    } catch (err) {
        throw new Error(err.message);
    }
}




const deletePost = async (postId) => {
    try {
        const user = await getCurrentUser();
        //  await db.collection("post").where("postId", "==", postId).delete();
        const querySnapshot = await db.collection("post").where("postId", "==", postId).get();
        if (user.uid === querySnapshot.docs[0].data().userId) {
            querySnapshot.forEach(async doc => {
                if (doc.data().imageUrl)
                    await deleteFile(doc.data().fileName);
                await doc.ref.delete();
            });
            await postDecrement(user.uid);
            return true;
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const uploadFile = async (file) => {
    try {
        const imageRef = storageRef.child(`images/${file.name}`);
        await imageRef.put(file).then((snapshot) => {
            alert("SUCCESSFULLY UPLOADED POST IMAGE");
        });
        return imageRef;

    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteFile = async (filename) => {
    try {
        const imageRef = storageRef.child(`images/${filename}`);
        await imageRef.delete();
        return true;

    } catch (err) {
        throw new Error(err.message);
    }
}


const likePost = async (postId) => {
    try {
        const user = await getCurrentUser();
        const querySnapshot = await db.collection("post").where("postId", "==", postId).get();
        querySnapshot.forEach(async doc => {
            if (!doc.data().likes.includes(user.uid))
                await doc.ref.update({
                    likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
                });
            else
                await doc.ref.update({
                    likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
                });
        });
        return true;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const addComment = async (comment, postId) => {
    try {
        const user = await getCurrentUser();
        const commentId = uniqid();
        ;

        const commentData = {
            comment: comment,
            commentedBy: user.displayName,
            commentId: commentId,
            commentedAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        const querySnapshot = await db.collection("post").where("postId", "==", postId).get();
        querySnapshot.forEach(async doc => {
            await doc.ref.update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentData)
            });
        });
        return true;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const deleteComment = async (commentId, postId) => {
    try {
        const user = await getCurrentUser();
        const querySnapshot = await db.collection("post").where("postId", "==", postId).get();
        querySnapshot.forEach(async doc => {
            if (doc.data().userId === user.uid || doc.data().comments.find(comment => comment.commentedBy === user.displayName)) {
                const updatedCommentArray = doc.data().comments.filter(comment => comment.commentId !== commentId)
                await doc.ref.update({
                    comments: updatedCommentArray
                });
            }
        });
        return true;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export { uploadPost, deletePost, uploadFile, deleteFile, likePost, addComment, deleteComment, getUserPosts, getRecentPosts };