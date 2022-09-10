import React, { useState } from 'react';
import './Credential.css';

function Credential() {
    const [hangerNumber, setHangerNumber] = useState(3);

    return (
        <div className="credential">
            <img src={require('./hanger.png')} alt="hanger" width={30} />
            <p>{hangerNumber}</p>
        </div>
    );
}

export default Credential;
