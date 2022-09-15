import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
