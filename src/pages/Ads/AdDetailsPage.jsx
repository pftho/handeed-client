import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdDetails from '../../components/adDetails/AdDetails';
import { AuthContext } from '../../context/auth.context';

function AdDetailsPage() {
    const [ad, setAd] = useState({});
    const [chats, setChats] = useState({});
    const { adId } = useParams();
    const { getToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const getAd = async () => {
        const url = `${API_URL}/ads/${adId}`;
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setAd(response.data);
    };

    const getChats = async () => {
        const url = `${API_URL}/api/chat/${adId}`;
        const storedToken = localStorage.getItem('authToken');
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setChats(response.data);
    };

    const API_URL = 'http://localhost:5005';

    useEffect(() => {
        try {
            getAd();
        } catch (error) {
            console.log(error);
        }
    }, [adId]);

    useEffect(() => {
        try {
            getChats();
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
            <AdDetails
                {...ad}
                chats={chats}
                onChatOpen={() => {
                    getChats();
                }}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default AdDetailsPage;
