import React from 'react';
import { useState } from 'react';

function SignUpPage() {
    //States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    //handlers
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            {' '}
            <h1>Sign Up</h1>
            <label for="username">User Name</label>
            <input
                name="username"
                required
                type="text"
                onChange={handleChange}
                value={formData.username}
            />
            <label for="email">Email</label>
            <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                value={formData.email}
            />
            <label for="password">Password</label>
            <input
                name="password"
                required
                type="password"
                onChange={handleChange}
                value={formData.password}
            />
        </div>
    );
}

export default SignUpPage;
