import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import LandingPage from './pages/LandingPage';
import AdDetailsPage from './pages/Ads/AdDetailsPage';
import CreateAd from './components/forms/CreateAd';
import AdListPage from './pages/Ads/AdListPage';
import IsPrivate from './components/IsPrivate';
import UpdateAd from './components/forms/UpdateAd';
import ErrorPage from './pages/ErrorPage';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path={'/auth/signup'} element={<SignUpPage/>} />
                <Route path={'/auth/login'} element={<LoginPage/>} />
                <Route path={'/user/:userId'} element={<IsPrivate><ProfilePage /></IsPrivate>} />
                <Route path={'/'} element={<LandingPage />} />
                <Route path={'/ads'} element={<AdListPage />} />
                <Route path={'/ads/:adId'} element={<AdDetailsPage />} />
                <Route path={'/ads/create'} element={<IsPrivate><CreateAd /></IsPrivate>} />
                <Route path={'/ads/:adId/edit'} element={<IsPrivate><UpdateAd /></IsPrivate>} />
                <Route path={'*'} element={<ErrorPage/>} />
                <Route path={'/page-not-found'} element={<ErrorPage/>} />
            </Routes>
        </div>
    );
}

export default App;
