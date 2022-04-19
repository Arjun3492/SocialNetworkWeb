import React, { useEffect } from 'react'
import { HiOutlineLogout, HiHome } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../core/services/firebase_auth';
import { getUser } from '../../core/services/user';
import { LOGIN_USER } from '../../redux/actions/async_action';
import { signOutUser } from '../../redux/actions/user_actions';
import './home.scss';

export default function Home() {
    const dispatch = useDispatch()
    const logout = () => dispatch(signOutUser())
    useEffect(() => {
        const currentUser = async () => {
            const user = await getCurrentUser();
            const userDetails = await getUser(user.uid);
            dispatch(LOGIN_USER(userDetails));
        }
        currentUser();
    }, [dispatch])
    const user = useSelector((state) => state.user);
    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="navbar-brand px-4">
                    The Social Network
                </div>
                <div className="ms-auto px-4 text-white d-flex justify-content-around " >
                    <HiHome size={26} className="mx-2" role="button" />
                    <Link to={`/profile/${user.uid}`} state={user}>
                        <img src={user.photoURL} alt="PROFILE" className="avatar mx-2" role="button" data-toggle="tooltip" data-placement="bottom" title={user.displayName} />
                    </Link>
                    <HiOutlineLogout size={26} className="mx-2" role="button" onClick={() => logout()} />
                </div>
            </nav>
            <div className="container bg-light">
            </div>
        </>
    )
}

