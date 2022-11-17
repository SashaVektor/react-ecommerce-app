import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import registerImg from '../../assets/register.png'
import Card from '../../components/card/Card'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'
import styles from './Auth.module.scss'
import Loader from '../../components/loader/Loader'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not mutch")
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoading(false)
                toast.success("Registration Successfully")
                navigate('/login')
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input type="text" placeholder='Email' required
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' required
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <input type="password" placeholder='Confirm Password' required
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <button className="--btn --btn-primary --btn-block" type='submit'>Register</button>
                        </form>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="register img" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register
