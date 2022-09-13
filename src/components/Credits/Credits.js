import React, { useContext, useReducer, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Credits.css';

function Credits() {
    const { user } = useContext(AuthContext);
    return (
        <div className="credits">
            <img src={require('./hanger.png')} alt="hanger" width={30} />
            <p>{user.credits}</p>
        </div>
    );
}

export default Credits;
