import React, { useState } from 'react'
import loginImg from '../../assets/login.png'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.scss'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectPreviousUrl } from '../../redux/slice/cartSlice'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const previousUrl = useSelector(selectPreviousUrl)

    const redirectUser = () => {
        if(previousUrl.includes('cart')){
            return navigate('/cart')
        }
        navigate('/home')
    }

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoading(false)
                toast.success("You are in the system")
                redirectUser();
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    // Login with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                toast.success("Login Successfully")
                redirectUser();
            }).catch((error) => {
                toast.error(error.message)
            });
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="login img" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={loginUser}>
                            <input type="text" placeholder='Email' required
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' required
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <button className="--btn --btn-primary --btn-block" type='submit'>Login</button>
                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button
                            className="--btn --btn-danger --btn-block"
                            onClick={signInWithGoogle}>
                            <FaGoogle />Login With Google</button>
                        <span className={styles.register}>
                            <p>Don't have an account? </p>
                            <Link to="/register">Register</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login
