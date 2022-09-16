import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './ProfilePage.css';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function ProfilePage() {
    const [localImageUrl, setImageUrl] = useState('');

    const { user, getToken } = useContext(AuthContext);
    if (user === null) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `${API_URL}/api/profile/user/${user.id}`,
            { imageUrl: localImageUrl },
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0]);

        axios
            .post(`${API_URL}/api/profile/upload`, uploadData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((response) => {
                setImageUrl(response.data.fileUrl);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile">
                <div className="profile-picture">
                    <h2>{user.username}</h2>
                    <img src={localImageUrl || user.imageUrl} alt="profile" />
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileUpload} />
                        <button
                            className="update-profile-image-btn"
                            type="submit"
                            disabled={!localImageUrl}
                        >
                            Update
                        </button>
                    </form>
                </div>
                <div className="info-div">
                    <h2>My information</h2>
                    <div className="user-info">
                        <h3>User Name</h3>
                        <p>{user.username}</p>
                    </div>

                    <div className="user-info">
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="user-info">
                        <h3>Home adress</h3>
                        <p>{user.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
