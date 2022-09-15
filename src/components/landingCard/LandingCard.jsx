import React from 'react';
import './LandingCard.css'

function LandingCard({step, description, img}) {
    return (
        <article className='landing-card'>
            <h3>{step}</h3>
            <p>
            {description}
            </p>
            <img src={img} alt="" className='landing-card-img'/>
        </article>
    );
}

export default LandingCard;
