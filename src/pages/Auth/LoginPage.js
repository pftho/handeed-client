import React from 'react';
import { useState } from 'react';

function LoginPage() {
    //States
    const [formData, setFormData] = useState({
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
            <h1>Log in</h1>
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

export default LoginPage;
