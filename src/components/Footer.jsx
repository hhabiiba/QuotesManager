import React from 'react';
import instagramLogo from '../assets/logo-instagram.svg';
import discordLogo from '../assets/logo-discord.svg';

const Footer = () => {
  return (
    <footer>
      <p>© 2024 Quotephoria. All rights reserved.</p>
      <p>Terms of Service | Privacy Policy</p>
      <p>Quotephoria: Fueling your journey with the power of words.</p>
      <div>
        <a href="https://www.instagram.com/__H.H.B__">
          <img src={instagramLogo} alt="Instagram" />
        </a>
        <a href="https://discord.com/i_was.reloading_">
          <img src={discordLogo} alt="Discord" />
        </a>
      </div>
      <p>Explore more:</p>
      <ul>
        <li><a href="#">Inspirational Blogs</a></li>
        <li><a href="#">Recommended Reading</a></li>
        <li><a href="#">Partner Websites</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
