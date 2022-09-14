import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdDetails from '../components/adDetails/AdDetails';

function AdDetailsPage() {
    const [ad, setAd] = useState({});
    const { adId } = useParams();

    const getAd = async (url) => {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setAd(response.data);
    };

    useEffect(() => {
        const API_URL = 'http://localhost:5005';
        try {
            getAd(`${API_URL}/ads/${adId}`);
        } catch (error) {
            console.log(error);
        }
    }, [adId]);
    
    useEffect(() => {
        const API_URL = 'http://localhost:5005';
        try {
            getAd(`${API_URL}/ads/${adId}`);
        } catch (error) {
            console.log(error);
        }
    }, [adId]);

    return (
        <div>
            <AdDetails {...ad} />
        </div>
    );
}

export default AdDetailsPage;
