import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5005';
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoaded] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

    const authenticateUser = () => {
        const storeToken = localStorage.getItem('authToken');
        console.log(storeToken);
        if (storeToken) {
            axios
                .get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storeToken}` },
                })
                .then((response) => {
                    const user = response.data;
                    console.log(user);
                    setIsLoggedIn(true);
                    setIsLoaded(false);
                    setUser(user);
                })
                .catch((err) => {
                    setIsLoaded(false);
                    setIsLoggedIn(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoaded(false);
            setUser(null);
        }
    };
    const removeToken = () => {
        localStorage.removeItem('authToken');
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        authenticateUser();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
