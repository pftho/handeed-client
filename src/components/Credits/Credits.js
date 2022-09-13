import React, { useState } from 'react';
import './Credits.css';

function Credits() {
    const [hangerNumber, setHangerNumber] = useState(3);

    return (
        <div className="credits">
            <img src={require('./hanger.png')} alt="hanger" width={30} />
            <p>{hangerNumber}</p>
        </div>
    );
}

export default Credits;
