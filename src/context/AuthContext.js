import { createContext } from "react";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log('user', user);
        });
        return () => { unsub(); }
    }, []);

    // It means that this component can reach currentUser an provide it to all children
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}