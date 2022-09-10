import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
const API_URL = 'http://localhost:5005/api';

function ProfilePage() {
    const [localImageUrl, setImageUrl] = useState('');

    const { user, getToken } = useContext(AuthContext);
    if (user === null) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(localImageUrl);
        axios.put(
            `${API_URL}/user/${user.id}`,
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
            .post(`${API_URL}/upload`, uploadData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((response) => {
                console.log(response);
                setImageUrl(response.data.fileUrl);
            })
            .catch((err) => console.log(err));
    };
    console.log(user);

    return (
        <div>
            <h1>Your profile page</h1>
            <div>
                <label>Profile picture</label>
                <img
                    src={localImageUrl || user.imageUrl}
                    alt="profile"
                    width={100}
                />
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileUpload} />
                    <button type="submit" disabled={!localImageUrl}>
                        Update
                    </button>
                </form>
            </div>

            <div>
                <label>User Name</label>
                <p>{user.username}</p>
            </div>

            <div>
                <label>Email</label>
                <p>{user.email}</p>
            </div>
            <div>
                <label>Home adress</label>
                <p>{user.address}</p>
            </div>

            <div>
                <label>Reviews</label>
                <p>{user.reviews}</p>
            </div>
        </div>
    );
}

export default ProfilePage;
