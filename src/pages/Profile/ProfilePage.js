import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
const API_URL = 'http://localhost:5005/api';

function ProfilePage() {
    const [imageUrl, setImageUrl] = useState(
        'https://i.stack.imgur.com/34AD2.jpg'
    );

    const { user } = useContext(AuthContext);
    if (user === null) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${API_URL}/user/:userId`, { imageUrl })
            .then((response) => response.status(200).json({ user }));
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0]);
        // console.log(uploadData.imageUrl);
        axios
            .post(`${API_URL}/upload`, uploadData)
            .then((response) => {
                console.log(response);
            })
            .then((response) => {
                console.log(response);
                setImageUrl(response.fileUrl);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>Your profile page</h1>
            <div>
                <label>Profile picture</label>
                <img src={imageUrl} alt="profile" width={100} />
                <form onSubmit={handleSubmit}>
                    {' '}
                    <input type="file" onChange={handleFileUpload} />
                    <button>Update</button>
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
