import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function SignUpPage() {
    //States
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
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
            .post(`${API_URL}/api/auth/signup`, formData)
            .then((response) => {
                navigate('/auth/login');
            })
            .catch((err) => {
                const error = err.response.data.errorMessage;
                setErrorMessage(error);
            });
    };

    return (
        <div className="form-container">
            {' '}
            <h1>Sign Up</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>User Name</label>
                <input
                    name="username"
                    required
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Lloyd"
                />
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="ironhacker@gmail.com"
                />
                <label>Password</label>
                <input
                    name="password"
                    required
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="********"
                />
                <label>Address</label>
                <input
                    name="address"
                    required
                    type="address"
                    onChange={handleChange}
                    value={formData.address}
                    placeholder="42 Ironhack Street 01100 TechCity Devland"
                />
                <button className="form-btn" type="submit">
                    Sign Up
                </button>
                {errorMessage && (
                    <p className="errorMessage"> {errorMessage} </p>
                )}
            </form>
            <p>
                Already have an account?{' '}
                <Link className="other-auth-link" to="/auth/login">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUpPage;
