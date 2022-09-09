import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import routes from './config/routes';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path={'/auth/signup'} element={<SignUpPage />} />
                <Route path={'/auth/login'} element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
