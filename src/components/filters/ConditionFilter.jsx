import React from 'react';

function ConditionFilter({ ads, setAds, originalAds }) {
    const handleConditionChange = (e) => {
        const value = e.target.value;
        if (value === 'All') {
            setAds(originalAds);
        } else {
            const filteredAds =
                ads.length < originalAds.length
                    ? ads.filter((ad) => ad.condition === value)
                    : originalAds.filter((ad) => ad.condition === value);
            setAds(filteredAds);
        }
    };

    return (
        <div className=" filters filters-condition">
            <h3 className="filters-heading">Condition</h3>
            <div>
                <input
                    type="radio"
                    id="all"
                    name="condition"
                    value="All"
                    checked={ads.length === originalAds.length ? 'checked' : ''}
                    onChange={handleConditionChange}
                />
                <label htmlFor="All">All</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="Brand New"
                    name="condition"
                    value="Brand New"
                    onChange={handleConditionChange}
                />
                <label htmlFor="Brand New">Brand New</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="Like New"
                    name="condition"
                    value="Like New"
                    onChange={handleConditionChange}
                />
                <label htmlFor="Like New">Like New</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="Good Condition"
                    name="condition"
                    value="Good Condition"
                    onChange={handleConditionChange}
                />
                <label htmlFor="Good Condition">Good Condition</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="Worn"
                    name="condition"
                    value="Worn"
                    onChange={handleConditionChange}
                />
                <label htmlFor="Worn">Worn</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="Broken"
                    name="condition"
                    value="Broken"
                    onChange={handleConditionChange}
                />
                <label htmlFor="Broken">Broken</label>
            </div>
        </div>
    );
}

export default ConditionFilter;
