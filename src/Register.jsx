import React, { useState } from 'react'
import { AddPhotoAlternate } from '@mui/icons-material';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from './firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {

    const [err, setErr] = useState(false);
    const [hide, setHide] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, {
                displayName: displayName,
                photoURL: "https://thumbs.dreamstime.com/b/happy-smiling-portrait-16656697.jpg"
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: res.user.photoURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');

            // Image profile will be added to dartagnan

            //     // Updload profile image to firebase storage
            //     const storageRef = ref(storage, `${res.user.uid}/profileImage`);

            //     const uploadTask = uploadBytesResumable(storageRef, file);

            //     uploadTask.on(
            //         (error) => {
            //             // Handle unsuccessful uploads
            //             setErr(true)
            //             console.err(error)
            //         },
            //         () => {
            //             // Handle successful uploads on complete
            //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //                 await updateProfile(res.user, { photoURL: downloadURL });
            //             });
            //         }
            //     );
        } catch (err) {
            setErr(true)
            console.error(err)
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Lama Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='display name'></input>
                    <input type='email' placeholder='email'></input>
                    <input type={hide && 'password'} placeholder='password'></input>
                    <input style={{ display: "none" }} type='file' id='file'></input>
                    <div style={{ display: 'flex' }}>
                        <input style={{ width: 'fit-content', marginRight: '5px' }} type='checkbox' id='pass' onChange={() => setHide(!hide)}></input>
                        <label htmlFor='pass'>Hide password</label>
                    </div>
                    <label htmlFor='file'>
                        <AddPhotoAlternate className='uploadIcon' width={32} />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span className='err'>Something went wrong!</span>}
                </form>
                <p>You do have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}

export default Register