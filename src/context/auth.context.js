import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5005';
const AuthContext = React.createContext();

function AuthProviderWrapper() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoaded] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        const storeToken = localStorage.getItem(authToken);
    };

    if (storedToken) {
        axios
            .get(`${API_URL}/auth/verify`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const user = response.data;
            });
    }
}

export { AuthProviderWrapper, AuthContext };
