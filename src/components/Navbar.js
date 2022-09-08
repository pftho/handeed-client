import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

function navBar() {
    return (
        <nav>
            <Link to="/signup">
                <button>Sign Up</button>{' '}
            </Link>
            <Link to="/login">
                <button>Login</button>{' '}
            </Link>
        </nav>
    );
}

export default navBar;
