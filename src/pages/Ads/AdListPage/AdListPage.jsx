import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AdList from '../../../components/adList/AdList';
import Banner from '../../../components/banner/Banner';
import SearchBar from '../../../components/searchBar/SearchBar';
import Filters from '../../../components/filters/Filters';
import './AdListPage.css';
import { AuthContext } from '../../../context/auth.context';

let originalAds = [];

function AdListPage() {
    const [ads, setAds] = useState([]);

    const { getToken } = useContext(AuthContext);

    const getAds = async () => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

        const response = await axios.get(`${API_URL}/api/ads`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        originalAds = response.data;
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
        <div className='ad-list-page'>
            <SearchBar ads={ads} setAds={setAds} originalAds={originalAds} />
            <Banner />
            <div className='filters-ad-list'>
            <Filters ads={ads} setAds={setAds} originalAds={originalAds} />
            <AdList ads={ads} />
            </div>
        </div>
    );
}

export default AdListPage;
