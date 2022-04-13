import firebase, { db, storage } from './firebase.config';
import { getCurrentUser } from './firebaseAuth';
import randomstring from 'randomstring';

const storageRef = storage.ref();
const uploadPost = async (title, file, filename) => {
    try {
        const user = await getCurrentUser();
        const docRef = db.collection("post").doc(user.id);
        const postId = randomstring.generate();
        var postData;
        if (file) {
            const imageRef = await uploadFile(file, user.id);
            const imageUrl = await imageRef.getDownloadURL();
            postData = {
                title: title,
                postId: postId,
                userId: user.uid,
                userName: user.displayName,
                imageUrl: imageUrl,
                fileName: filename,
            }
        } else {
            postData = {
                title: title,
                postId: postId,
                userId: user.uid,
                userName: user.displayName,
            }
        }
        await docRef.set(postData);
        return true;
    }
    catch (err) {
        throw new Error(err.message);
    }
}


const deletePost = async (postId) => {
    try {
        //  await db.collection("post").where("postId", "==", postId).delete();
        const querySnapshot = await db.collection("post").where("postId", "==", postId).get();
        querySnapshot.forEach(async doc => {
            if (doc.data().imageUrl) {
                await deleteFile(doc.data().fileName);
            }
            await doc.ref.delete();
            return true;
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}

const uploadFile = async (file, filename) => {
    try {
        var imageRef = storageRef.child(`images/${filename}.jpg`);
        await imageRef.put(file);
        return imageRef;

    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteFile = async (filename) => {
    try {
        var imageRef = storageRef.child(`images/${filename}.jpg`);
        await imageRef.delete();
        return true;

    } catch (err) {
        throw new Error(err.message);
    }
}


const likePost = async (postId) => {
    try { }
    catch (err) {
        throw new Error(err.message);
    }
}
export { uploadPost, deletePost, uploadFile, deleteFile };