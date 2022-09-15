import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import dress from '../../assets/dress.png'
import './Credits.css';

function Credits() {
    const { user } = useContext(AuthContext);
    return (
        <div className="credits">
            <img src={dress} alt="credits" className='dress-icon' />
            <p className='credit-number'>{user.credits}</p>
        </div>
    );
}

export default Credits;
