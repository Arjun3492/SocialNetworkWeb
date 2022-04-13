import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state) => state.user);
    return (
        <>
            <div className="container px-5">
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
                                <button className=" btn-sm btn btn-outline-primary" style={{
                                    width: "20%",
                                }}>FOLLOW</button>
                            </div>
                            <div className="row mt-3 w-75">
                                <div className="col d-flex"><p className="fw-bold ">
                                    5</p>
                                    <p className="mx-2">posts</p>
                                </div>
                                <div className="col d-flex"><p className="fw-bold ">
                                    1</p>
                                    <p className="mx-2">follower</p>
                                </div>
                                <div className="col d-flex"><p className="fw-bold ">
                                    4</p>
                                    <p className="mx-2">following</p>
                                </div>

                            </div>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile