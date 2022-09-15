import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

    const getToken = (token) => {
        return localStorage.getItem('authToken', token);
    };

    const isLoggedPreviously = async () => {
        if (user != null) {
            await axios
                .get(`${API_URL}/api/profile/user/${user._id}`, {
                    headers: { Authorization: `Bearer ${storeToken}` },
                })
                .then((response) => {
                    const user = response.data;
                    setUser(user);
                    setIsLoggedIn(true);
                    setIsLoaded(false);
                });
        } else {
            await authenticateUser();
        }
    };

    const authenticateUser = async () => {
        const storeToken = localStorage.getItem('authToken');
        if (storeToken) {
            setIsLoaded(true);
            await axios
                .get(`${API_URL}/api/auth/verify`, {
                    headers: { Authorization: `Bearer ${storeToken}` },
                })
                .then(async (response) => {
                    return await axios.get(
                        `${API_URL}/api/profile/user/${response.data._id}`,
                        {
                            headers: { Authorization: `Bearer ${storeToken}` },
                        }
                    );
                })
                .then((response) => {
                    const user = response.data;
                    setUser(user);
                    setIsLoggedIn(true);
                    setIsLoaded(false);
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
        navigate('/auth/login');
    };

    const checkIfOwner = (adId) => {
        if (!user) {
            setIsOwner(false);
        } else if (user.ads.map((ad) => ad._id).includes(adId)) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                isOwner,
                setUser,
                storeToken,
                getToken,
                authenticateUser,
                logOutUser,
                checkIfOwner,
                isLoggedPreviously,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
