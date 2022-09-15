import React from 'react';
import AdressFilter from './AdressFilter';
import CategoryFilter from './CategoryFilter';
import ConditionFilter from './ConditionFilter';
import SizeFilter from './SizeFilter';
import './Filters.css';

function Filters({ ads, setAds, originalAds }) {
    return (
        <div className="filters-wrapper">
            <AdressFilter ads={ads} setAds={setAds} originalAds={originalAds} />
            <div className="select-radio">
                <CategoryFilter
                    ads={ads}
                    setAds={setAds}
                    originalAds={originalAds}
                />

                <SizeFilter
                    ads={ads}
                    setAds={setAds}
                    originalAds={originalAds}
                />
                <ConditionFilter
                    ads={ads}
                    setAds={setAds}
                    originalAds={originalAds}
                />
            </div>
        </div>
    );
}

export default Filters;
