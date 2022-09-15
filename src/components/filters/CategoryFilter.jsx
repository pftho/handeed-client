import React from 'react';

function CategoryFilter({ ads, setAds, originalAds }) {
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === 'All') {
            setAds(originalAds);
        } else {
            const filteredAds =
                ads.length < originalAds.length
                    ? ads.filter((ad) => ad.category === value)
                    : originalAds.filter((ad) => ad.category === value);
            setAds(filteredAds);
        }
    };

    return (
        <div className="filters filters-category">
            <h3 className="filters-heading">Category</h3>
            <select name="category" onChange={handleCategoryChange}>
                <option value="All">All</option>
                <option value="Accessory">Accessory</option>
                <option value="Bag">Bag</option>
                <option value="Coat">Coat</option>
                <option value="Dress">Dress</option>
                <option value="Jacket">Jacket</option>
                <option value="Pyjamas">Pyjamas</option>
                <option value="Shorts">Shorts</option>
                <option value="Shoes">Shoes</option>
                <option value="Skirt">Skirt</option>
                <option value="Sport">Sport</option>
                <option value="Sweater">Sweater</option>
                <option value="Top">Top</option>
                <option value="Trousers">Trousers</option>
                <option value="Underwear">Underwear</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
}

export default CategoryFilter;
