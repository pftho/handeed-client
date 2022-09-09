import React from 'react';
import {Link} from 'react-router-dom'

function AdDetails({
_id,
  image,
  title,
  description,
  brand, 
  size,
  category, 
  condition,
  city
}) {
  return (
    <div className='ad-details'>
      <img src={image} alt='' />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{brand}</p>
      <p>{size}</p>
      <p>{category}</p>
      <p>{condition}</p>
      <p>{city}</p>
      
      <Link to={`/ads/${_id}/edit`}>
        <button>Edit this ad</button>
      </Link> 

    </div>
  );
}

export default AdDetails;
