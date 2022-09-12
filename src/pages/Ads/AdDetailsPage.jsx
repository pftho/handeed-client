import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdDetails from '../../components/adDetails/AdDetails';
import { AuthContext } from '../../context/auth.context';

function AdDetailsPage() {
    const [ad, setAd] = useState({});
    const { adId } = useParams();
    const { getToken, user } = useContext(AuthContext);
    const navigate = useNavigate();



    const getAd = async (url) => {
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        //console.log(user)
        setAd(response.data);
    };

    const API_URL = 'http://localhost:5005';

    useEffect(() => {
        try {
            getAd(`${API_URL}/ads/${adId}`);
        } catch (error) {
            console.log(error);
        }
    }, [adId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/ads/${adId}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            navigate('/ads');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <AdDetails {...ad} handleDelete={handleDelete} />
        </div>
    );
}

export default AdDetailsPage;