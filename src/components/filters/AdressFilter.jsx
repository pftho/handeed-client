import React, { useState } from 'react';
import axios from 'axios';

function AdressFilter({ ads, setAds, originalAds }) {
    const API_URL = 'http://localhost:5005';
    const [search, setSearch] = useState('');

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

    const handleSubmit = (e) => {
        e.preventDefault();
        getAds();
    };

    const getAds = () => {
        try {
            const storedToken = localStorage.getItem('authToken');
            axios
                .get(
                    `${API_URL}/api/location?address=${search}&radius=${10000}`,
                    {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    }
                )
                .then((response) => {
                    console.log(response);

                    setAds(response.data.map((el) => el.ads).flat());
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="filters filters-address search-bar">
            <h3 className="filters-heading">Search near me</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter an address"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                />
                <button type="submit" className="filters-address-btn search-btn">
                    <i className="fa-solid fa-magnifying-glass "></i>
                </button>
            </form>
        </div>
    );
}

export default AdressFilter;
