import React from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth.context';
import { useContext } from 'react';
import './MyAdPage.css';
import AdCard from '../../components/adCard/AdCard';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function MyAdPage() {
    const { user, getToken, setUser } = useContext(AuthContext);
    if (user === null) {
        return null;
    }

    const handleCredit = async (_id) => {
        await axios.delete(`${API_URL}/api/ads/${_id}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        await axios.put(
            `${API_URL}/api/profile/user/${user.id}`,
            { credits: user.credits + 1 },
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );

        const updatedUser = await axios.get(
            `${API_URL}/api/profile/user/${user.id}`,
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );

        setUser(updatedUser.data);
    };

    return (
        <div>
            <h1>My ads</h1>
            <div>
                <label>My ads</label>
                <ul>
                    {user.ads.length ? (
                        user.ads.map((ad) => {
                            return (
                                <div key={ad._id}>
                                    <AdCard {...ad} />
                                    <button
                                        onClick={() => handleCredit(ad._id)}
                                    >
                                        Confirm donation
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p>You don't have any ads yet</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MyAdPage;
