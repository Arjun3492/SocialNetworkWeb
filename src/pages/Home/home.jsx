import React, { useEffect } from 'react'
import { HiOutlineLogout, HiHome } from 'react-icons/hi';
import { MdPerson } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actions/user_auth_actions';

export default function Home() {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(signOutUser())
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="navbar-brand px-4">
                    The Social Network
                </div>
                <div className="ms-auto px-4 text-white d-flex justify-content-around " >
                    <HiHome size={26} className="mx-2" role="button" />
                    <HiOutlineLogout size={26} className="mx-2" role="button" onClick={() => logout()} />
                    <MdPerson size={26} className="mx-2" role="button" />
                </div>
            </nav>
            <div className="container bg-light">

            </div>
        </>
    )
}

