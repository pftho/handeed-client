import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import Credits from '../Credits/Credits';
import logo from '../../assets/handeed-logo.png';
import './Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser, isLoggedPreviously } =
        useContext(AuthContext);

    const [isNavBarOpen, setNavbarOpen] = useState(false);

    const [isSmallScreen, setBigScreen] = useState(
        window.matchMedia('(min-width: 768px)').matches
    );

    useEffect(() => {
        isLoggedPreviously();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        window
            .matchMedia('(min-width: 768px)')
            .addEventListener('change', (e) => setBigScreen(e.matches));
    });

    const navUrlMobile = ['/ads', '/ads/create', '/myads'];

    const navItems = ['Catalogue', 'Create an ad', 'My ads'];

    const navLinksMobile = navItems.map((el, index) => {
        return (
            <li>
                <Link to={navUrlMobile[index]} className="nav__item nav-link">
                    {el}
                </Link>
            </li>
        );
    });

    const closeMobileNav = () => {
        setNavbarOpen(false);
    };

    const smallScreen = () => {
        return (
            <header className="header-mobile">
                <Link to="/" className="homepage-link">
                    <img src={logo} alt="" className="logo" />
                </Link>

                <div className="nav-mobile">
                    <Credits />
                    <button
                        onClick={() => setNavbarOpen(true)}
                        className="toggle-btn"
                    >
                        <i className="fa-solid fa-bars fa-lg"></i>
                    </button>

                    {isNavBarOpen && (
                        <nav className="menu-displayed">
                            <button
                                onClick={closeMobileNav}
                                className="close-btn"
                            >
                                <i className="fa-solid fa-x"></i>
                            </button>

                            <ul onClick={closeMobileNav}>
                                {navLinksMobile}
                                <li>
                                    <Link to={`/user/${user.id}`}>Profile</Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logOutUser}
                                        className="logout-btn-mobile"
                                    >
                                        Logout{' '}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </header>
        );
    };

    const bigScreen = () => {
        return (
            <header className="header">
                <Link to="/" className="homepage-link">
                    <img
                        src={logo}
                        alt="retourner à l'accueil"
                        className="logo"
                    />
                </Link>

                <nav className="nav-desktop">
                    <Link to="/ads">Catalogue</Link>
                    <Link to="/ads/create" className="create-ad">
                        Create an ad
                    </Link>
                    <Link to="/myads">My Ads</Link>
                    <Link to={`/user/${user.id}`}>Profile</Link>
                    <Credits />
                    <button className="logout-btn" onClick={logOutUser}>
                        Logout <i className="fa-solid fa-power-off"></i>
                    </button>
                </nav>
            </header>
        );
    };

    return (
        <>
            {isLoggedIn && (isSmallScreen ? bigScreen() : smallScreen())}
            {!isLoggedIn && (
                <header>
                    <Link to="/" className="homepage-link">
                        <img
                            src={logo}
                            alt="retourner à l'accueil"
                            className="logo"
                        />
                    </Link>
                    <nav className="nav-desktop nav-logged-out">
                        <Link to="/auth/signup">Sign Up</Link>
                        <Link to="/auth/login">Login</Link>
                    </nav>
                </header>
            )}
        </>
    );
}

export default Navbar;
