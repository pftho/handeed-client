import axios from 'axios';
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './AuthForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    //handlers
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${API_URL}/api/auth/login`, formData)
            .then((response) => {
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/ads');
            })
            .catch((err) => {
                console.log(err);
                const error = err.response.data.errorMessage;
                setErrorMessage(error);
            });
    };

    return (
        <div className="form-container login-form">
            <h1>Log in</h1>
            <form className="form" onSubmit={handleSubmit}>
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
                <button className="form-btn" type="submit">
                    Log in
                </button>
                {errorMessage && (
                    <p className="errorMessage"> {errorMessage} </p>
                )}
            </form>
            <p>
                Not a member?{' '}
                <Link className="other-auth-link" to="/auth/signup">
                    Signup
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;
