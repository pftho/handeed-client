import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ ads, setAds, originalAds }) {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredAds =
            ads.length < originalAds.length
                ? ads.filter((ad) => ad.title.includes(search))
                : originalAds.filter((ad) => ad.title.includes(search));
        setAds(filteredAds);
    };

    return (
        <div className="global-search search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                />
                <button type="submit" className='search-btn'>
                    <i className="fa-solid fa-magnifying-glass "></i>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
