import React, { useEffect, useState, useContext } from 'react';
import AdCard from '../adCard/AdCard';
import axios from 'axios';
import './AdList.css';
import { AuthContext } from '../../context/auth.context';

function AdList() {
    const { isLoggedIn } = useContext(AuthContext);

    const [ads, setAds] = useState([]);

    const getAds = async () => {
        const API_URL = 'http://localhost:5005';
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(`${API_URL}/ads`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        console.log(response);
        setAds(response.data);
    };

    useEffect(() => {
        try {
            getAds();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="ads-list">
            {isLoggedIn && (
                <>
                    {ads.map((ad) => (
                        <AdCard key={ad._id} {...ad} />
                    ))}
                </>
            )}
            {!isLoggedIn && (
                <>
                    {ads.slice(0, 9).map((ad) => (
                        <AdCard key={ad._id} {...ad} />
                    ))}
                </>
            )}
        </div>
    );
}

export default AdList;
