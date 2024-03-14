import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Login from '../assets/logo-login.png'

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="QP-logo" />
        <h1>QuotePhoria</h1>
      </div>
      <div>
        <Link to="/login"><img src={ Login } alt="logo-login" /></Link>
      </div>
    </header>
  );
}

export default Header;
