import logo from '../../assets/logo/The_social_network.png'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { signInGoogle, signInFacebook } from '../../redux/actions/user_actions';


const Login = () => {
    const dispatch = useDispatch()

    return (
        <div className="d-flex justify-content-center flex-column bg-dark w-100 vh-100">


            <img src={logo} alt="" width="50%" className="mx-auto " />

            <div className="d-grid gap-2 col-6 mx-auto px-5 my-5">
                <button type="button" className="btn btn-block  btn-light shadow " onClick={() => dispatch(signInGoogle())}><FcGoogle /> Sign In With Google</button>
                <button type="button" className="btn btn-block btn-primary shadow " onClick={() => dispatch(signInFacebook())}><FaFacebookF /> Sign In With Facebook</button>

            </div>
        </div>

    )
}

export default Login;