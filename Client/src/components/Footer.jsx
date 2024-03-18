import React from 'react';
import instagramLogo from '../assets/logo-instagram.svg';
import discordLogo from '../assets/logo-discord.svg';
import logo from '../assets/logo.jpg'
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <img src={logo}alt="QP-Logo" className="footer-logo" />
      <div className="rights">
      <p>© 2024 Quotephoria. All rights reserved.</p>
      <p>Terms of Service | Privacy Policy</p>
    </div>
      <div className='footer-text'>
      <a href="https://info.team2" className='team-link'>Team#2</a>
        <p>Quotephoria: Fueling your journey with the power of words.</p>
      </div>
      <div className='explore'>
      <p>Explore more:</p>
        <p><a href="#" className='explore-link'>Inspirational Blogs</a></p>
        <p><a href="#" className='explore-link'>Recommended Reading</a></p>
        <p><a href="#" className='explore-link'>Partner Websites</a></p>
      </div>
      <div className='social-media'>
        <a href="https://www.instagram.com/__H.H.B__" className='social-link'>
          <img src={instagramLogo} alt="Instagram" className='social-icon'/>
        </a>
        <a href="https://discord.com/i_was.reloading_" className='social-link'>
          <img src={discordLogo} alt="Discord" className='social-icon' />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
