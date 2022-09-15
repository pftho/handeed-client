import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import AdCard from '../adCard/AdCard';
import Spinner from '../spinner/Spinner';
import './AdList.css';


function AdList({ ads }) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);


    return (
        <div className="ads-list">
            {isLoading && <Spinner />}

            {isLoggedIn && (
                <>
                    {ads.map((ad) => (
                        <AdCard key={ad._id} {...ad} />
                    ))}
                </>
            )}
            {!isLoggedIn && (
                <>
                    {ads.slice(0, 9).map((ad) => (
                        <AdCard key={ad._id} {...ad} />
                    ))}
                </>
            )}
        </div>
    );
}

export default AdList;
