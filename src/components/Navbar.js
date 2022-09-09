import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    console.log(user);
    return (
        <nav>
            {isLoggedIn && (
                <>
                    <Link to="/ads/list">
                        <button>Our Ads</button>
                    </Link>
                    <div>
                        <p>credit</p>
                    </div>
                    <Link to="/">
                        <button>Messages</button>
                    </Link>
                    {/* <Link to={`/user/${user._id}`}>{user.username}</Link> */}
                    <Link to="#">My Ads</Link>
                    <button onClick={logOutUser}>Logout</button>
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
