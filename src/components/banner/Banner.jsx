import React from 'react'
import logoOrange from '../../assets/logo-bg-orange.png'
import hands from '../../assets/hands.png'
import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
        <img className='logo' src={logoOrange} alt="" />
        <p>Declutter your wardrobe and start giving stuff around you!</p>
        <img className='hands' src={hands} alt="" />
    </div>
  )
}

export default Banner