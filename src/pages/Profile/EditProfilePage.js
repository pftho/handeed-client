import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function ProfilePage() {
    const { user } = useContext(AuthContext);
    if (user === null) {
        return null;
    }
    return (
        <div>
            <h1>Your profile page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Profile picture</label>
                    <img src={user.image} alt="profile picture" />
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

                <button type="submit">Edit</button>
            </form>
        </div>
    );
}

export default ProfilePage;
