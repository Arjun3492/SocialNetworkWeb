/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getUser } from '../../core/services/user';
import { followUser, unfollowUser } from '../../redux/actions/user_actions';
import ReactModal from 'react-modal';
import { getUserPosts, uploadPost } from '../../core/services/post';
import uniqid from 'uniqid';


function Profile() {
    const { id } = useParams();
    const location = useLocation();
    const currentUser = location.state;
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [post, setPost] = useState([]);
    const handleFileChange = (event) => {
        if (event.target.files[0])
            setImage(event.target.files[0])
    }
    const handleTitleChange = (event) => setTitle(event.target.value)
    const toggleFollowing = () => currentUser.following.includes(id) ? setFollowing(true) : setFollowing(false)

    useEffect(() => {
        if (currentUser.uid !== id)
            getUser(id).then(user => setUser(user));
        else
            setUser(currentUser);
        getUserPosts(currentUser.uid).then(posts => {
            setPost(posts);
        });
        setLoading(false);
        toggleFollowing();
        console.log(uniqid());
    }, [id, currentUser]);

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    return (!loading) ? (
        <>
            {<div className="container px-5">
                <ReactModal ariaHideApp={false}
                    style={{
                        overlay: {
                            margin: 'auto',
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            width: '25%',
                            height: '25%',
                        },
                        content: {
                            position: 'relative',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }}
                    isOpen={showModal}
                >
                    <div >
                        <label htmlFor="title">Enter the title below.</label>
                        <textarea id="title" rows="5" value={title} className="w-100" onChange={handleTitleChange} ></textarea>
                        <input id="file" type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <div className="d-flex justify-content-end my-2">
                        <button className="btn btn-primary mx-2" onClick={() => uploadPost(title, image)}>Upload</button>
                        <button onClick={toggleModal} className="btn btn-danger mx-2">Close</button>
                    </div>
                </ReactModal>
                <div className="row">
                    <div className="col-4 ">
                        <div className="p-5 d-flex justify-content-end">
                            <img src={user.photoURL} alt="PROFILE" className="rounded-circle " style={{
                                width: "50%",
                            }} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="py-5 ">
                            <div className="d-flex justify-content-between">
                                <p className="fw-bold fs-3 mr-3 my-auto">{user.displayName}</p>
                                {(user.uid !== id) && ((following) ? <button className=" btn-sm btn btn-outline-primary" onClick={() => { dispatch(unfollowUser(id)); toggleFollowing() }} style={{
                                    width: "20%",
                                }}>UNFOLLOW</button> : <button className=" btn-sm btn btn-outline-primary" onClick={() => {
                                    dispatch(followUser(id));
                                    toggleFollowing()
                                }} style={{
                                    width: "20%",
                                }}>FOLLOW</button>)}
                            </div>
                            <div className="row mt-3 w-75">
                                <div className="col d-flex"><p className="fw-bold ">
                                    {(user.posts) ? (user.posts) : 0}</p>
                                    <p className="mx-2">posts</p>
                                </div>
                                <div className="col d-flex">
                                    <p className="fw-bold ">
                                        {(user.followers) ? (user.followers.length) : 0}</p>
                                    <p className="mx-2">follower</p>
                                </div>
                                <div className="col d-flex"><p className="fw-bold ">
                                    {(user.following) ? (user.following.length) : 0}</p>
                                    <p className="mx-2">following</p>
                                </div>
                            </div>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            <button type="button" className="btn btn-primary" onClick={() => toggleModal()}>
                                UPLOAD POST
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">


                    {post.map((p, idx) => (
                        <div className="col-4" key={idx} >
                            <img src={p.imageUrl} alt="posts" height="160px" className="mx-4 " />
                        </div>
                    )
                    )}
                </div>
            </div >
            }
        </>
    ) : (<div>Loading...</div>)
}

export default Profile