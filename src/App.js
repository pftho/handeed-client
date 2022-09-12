import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import LandingPage from './pages/LandingPage';
import AdDetailsPage from './pages/AdDetailsPage';
import CreateAd from './components/forms/CreateAd';
import AdListPage from './pages/AdListPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import ChatPage from './pages/Chat/ChatPage';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path={'/auth/signup'} element={<SignUpPage />} />
                <Route path={'/auth/login'} element={<LoginPage />} />
                <Route path={'/'} element={<LandingPage />} />
                <Route path={'/user/:userId'} element={<ProfilePage />} />
                <Route path={'/ads'} element={<AdListPage />} />
                <Route path={'/ads/create'} element={<CreateAd />} />
                <Route path={'/ads/:adId'} element={<AdDetailsPage />} />
                <Route path={'/ads/:adId/edit'} element={<AdDetailsPage />} />
                <Route path={'/ads/:adId/message'} element={<ChatPage />} />
                {/* <Route path={'/auth/signup'} element={<IsAnon><SignUpPage/></IsAnon>} />
                <Route path={'/auth/login'} element={<IsAnon><LoginPage/></IsAnon>} />
                <Route path={'/'} element={<IsAnon><LandingPage /></IsAnon>} />
                <Route path={'/ads'} element={<IsPrivate><AdListPage /></IsPrivate>} />
                <Route path={'/ads/create'} element={<IsPrivate><CreateAd /></IsPrivate>} />
                <Route path={'/ads/:adId'} element={<IsPrivate><AdDetailsPage /></IsPrivate>} />
                <Route path={'/ads/:adId/edit'} element={<IsPrivate><AdDetailsPage /></IsPrivate>} /> */}
            </Routes>
        </div>
    );
}

export default App;
