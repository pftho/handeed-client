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
        console.log(e.target.value);
    };

    return (
        <div>
            <h1>Log in</h1>
            <label for="email">Email</label>
            <input name="email" type="email" required onChange={handleChange} />
            <label for="password">Password</label>
            <input
                name="password"
                required
                type="password"
                onChange={handleChange}
            />
        </div>
    );
}

export default LoginPage;
