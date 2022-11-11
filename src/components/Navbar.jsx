import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate('/login')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='navbar'>
            <span className="logo">Lama Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={handleSignOut}>logout</button>
            </div>
        </div>
    )
}

export default Navbar