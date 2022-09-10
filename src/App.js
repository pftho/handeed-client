import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import AdListPage from './pages/AdListPage';
import ProfilePage from './pages/Profile/ProfilePage';
import MessagePage from './pages/Message/MessagePage';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path={'/auth/signup'} element={<SignUpPage />} />
                <Route path={'/auth/login'} element={<LoginPage />} />
                <Route path={'/ads'} element={<AdListPage />} />
                <Route path={'/user/:userId'} element={<ProfilePage />} />
                <Route path={'/message'} element={<MessagePage />} />
            </Routes>
        </div>
    );
}

export default App;
