import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import Credits from '../Credits/Credits';
import './Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="nav">
            {isLoggedIn && (
                <>
                    <Credits />
                    <Link to="/ads">
                        <button>Our Ads</button>
                    </Link>
                    <Link to={`/user/${user.id}`}>{user.username}</Link>
                    <Link to="/myads">My Ads</Link>
                    <Link to="/ads/create">Create an ad</Link>
                    <button onClick={logOutUser}>Logout</button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <div>
                        <Link to="/auth/signup">
                            <button>Sign Up</button>
                        </Link>
                        <Link to="/auth/login">
                            <button>Login</button>
                        </Link>{' '}
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
