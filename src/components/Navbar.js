import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

function Navbar() {
    return (
        <nav>
            <Link to="/auth/signup">
                <button>Sign Up</button>
            </Link>
            <Link to="/auth/login">
                <button>Login</button>
            </Link>
        </nav>
    );
}

export default Navbar;
