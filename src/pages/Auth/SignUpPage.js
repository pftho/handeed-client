import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const API_URL = 'http://localhost:5005';

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
        <div className="form-container">
            <h1>Sign Up</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>User Name</label>
                <input
                    name="username"
                    required
                    type="text"
                    placeholder="ironhacker@gmail.com"
                    onChange={handleChange}
                    value={formData.username}
                />
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="ironhacker@gmail.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                />
                <label>Password</label>
                <input
                    name="password"
                    placeholder="********"
                    required
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <label>Address</label>
                <input
                    name="address"
                    required
                    placeholder="42 Ironhack Street 01100 TechCity Devland"
                    type="address"
                    onChange={handleChange}
                    value={formData.address}
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
