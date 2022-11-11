import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase.js';

const Login = () => {

    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            navigate('/');
        } catch (err) {
            setErr(err.message.slice(err.message.indexOf('(') + 1), err.message.lastIndexOf(')') - 1);
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Lama Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='email'></input>
                    <input type='password' placeholder='password'></input>
                    <button>Sign In</button>
                </form>
                <span className='err'>{err}</span>
                <p>You don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        </div>
    )
}

export default Login