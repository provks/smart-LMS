import { createContext, useContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();
const backendURL = "http://localhost:3002";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // login user
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(backendURL + "/api/auth/login", {email, password});
            // save into state
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data)); // storing user info in local storage
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

    // logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // storing user info in local storage
    }

    return <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);