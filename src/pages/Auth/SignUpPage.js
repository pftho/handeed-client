import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function SignUpPage() {
    //States
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    //handlers
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${API_URL}/auth/signup`, formData)
            .then((response) => {
                navigate('/auth/login');
            })
            .catch((err) => {
                const error = err.response.data.errorMessage;
                setErrorMessage(error);
            });
    };

    return (
        <div>
            {' '}
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input
                    name="username"
                    required
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                />
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                />
                <label>Password</label>
                <input
                    name="password"
                    required
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;
