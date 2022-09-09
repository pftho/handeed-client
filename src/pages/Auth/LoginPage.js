import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5005';

function LoginPage() {
    //States
    const [formData, setFormData] = useState({
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${API_URL}/auth/login`, formData)
            .then((response) => {
                navigate('/ads/list');
            })
            .catch((err) => {
                const error = err.response.data.errorMessage;
                setErrorMessage(error);
            });
    };

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                />
                <label >Password</label>
                <input
                    name="password"
                    required
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default LoginPage;
