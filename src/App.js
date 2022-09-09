import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/HomePage';
function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path={'/auth/signup'} element={<SignUpPage />} />
                <Route path={'/auth/login'} element={<LoginPage />} />
                <Route path={'/ads/list'} element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
