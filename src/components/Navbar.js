import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav>
            {isLoggedIn && (
                <>
                    <Link to="/">
                        <button>Our Ads</button>
                    </Link>
                    <div>
                        <p>credit</p>
                    </div>
                    <Link to="/">
                        <button>Messages</button>
                    </Link>
                    <div class="dropdown">
                        <button class="dropbtn">
                            {user.name}
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <Link to="#">Profile</Link>
                            <Link to="#">My ads</Link>
                            <Link to="#">Log out</Link>
                        </div>
                    </div>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <Link to="/auth/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/auth/login">
                        <button>Login</button>
                    </Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
