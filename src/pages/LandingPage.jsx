import React from 'react'
import {Link } from 'react-router-dom'
import AdList from '../components/adList/AdList'

function LandingPage() {
  return (
    <div>
      <div>
        <h1>Welcome to Handeed</h1>
        <h2>Readu to declutter your wardrobe?</h2>
        <Link to='/auth/signup'>Start giving now!</Link>
      </div>

      
        <h2>Getting started</h2>
        <p>To have a safe and successful selling experience on Handeed, simply follow these tips:</p>
      
        <article>
          <h3>Build a trusted profile</h3>
          <p>Add your profile picture and verify your account to show you’re a real person.
          You'll soon be able to update your info in your profile</p>
        </article>
      
    </div>
  )
}

export default LandingPage