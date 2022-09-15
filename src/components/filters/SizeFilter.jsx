import React from 'react';

function SizeFilter({ ads, setAds, originalAds }) {
    const handleSizeChange = (e) => {
        const value = e.target.value;
        if (value === 'ALL') {
            setAds(originalAds);
        } else {
            const filteredAds =
                ads.length < originalAds.length
                    ? ads.filter((ad) => ad.size === value)
                    : originalAds.filter((ad) => ad.size === value);
            setAds(filteredAds);
        }
    };

    return (
        <div className="filters filters-size">
            <h3 className="filters-heading">Size</h3>
            <div>
                <input
                    type="radio"
                    id="all"
                    name="size"
                    value="ALL"
                    checked={ads.length === originalAds.length ? 'checked' : ''}
                    onChange={handleSizeChange}
                />
                <label htmlFor="XS">All</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="XS"
                    name="size"
                    value="XS"
                    onChange={handleSizeChange}
                />
                <label htmlFor="XS">XS</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="S"
                    name="size"
                    value="S"
                    onChange={handleSizeChange}
                />
                <label htmlFor="S">S</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="M"
                    name="size"
                    value="M"
                    onChange={handleSizeChange}
                />
                <label htmlFor="M">M</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="L"
                    name="size"
                    value="L"
                    onChange={handleSizeChange}
                />
                <label htmlFor="L">L</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="XL"
                    name="size"
                    value="XL"
                    onChange={handleSizeChange}
                />
                <label htmlFor="XL">XL</label>
            </div>
            {/* <div>
                <input
                    type="radio"
                    id="XXL"
                    name="size"
                    value="XXL"
                    onChange={handleSizeChange}
                />
                <label htmlFor="XXL">XXL</label>
            </div> */}
        </div>
    );
}

export default SizeFilter;
