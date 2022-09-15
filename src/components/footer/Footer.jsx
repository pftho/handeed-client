import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className='networks'>
        <h3>Follow us !</h3>
        <div className='networks-content-wrapper'>
        <div className='networks-content'>
          <span>Pauline</span>
          <Link to="https://www.linkedin.com/in/paulinefarina/"><i className="fa-brands fa-linkedin"></i></Link>
          <Link to="https://github.com/pftho"><i className="fa-brands fa-github"></i></Link>
        </div>
        <div className='networks-content'>
          <span>Priscille</span>
          <Link to="https://www.linkedin.com/in/priscille-louisrose/"><i className="fa-brands fa-linkedin"></i></Link>
          <Link to="https://github.com/Priscille-LR"><i className="fa-brands fa-github"></i></Link>
        </div>
        </div>
      </div>

      
    
      <div className="copyright">
      <p><span role='image' aria-label='hamburger'>👗👕👜👚👖 </span>
        Ironhack Web Dev July 2022</p>
      </div>
      <p className="copyright">
         © Copyright 2022 Pauline & Priscille, Handeed | Contact |
         Legal Stuff
      </p>
      
    </footer>
  )
}

export default Footer