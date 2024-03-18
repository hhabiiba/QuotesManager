import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../assets/logo-Home.png';
import AddEdit from '../assets/logo-AddEdit.png';
import About from '../assets/logo-About.png';
import Contact from '../assets/logo-Contact.png';
import '../CSS/navbar.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <Link to="/" className='navbar-link'> <img src={ Home } alt="logo-Home" /></Link> 
        </li>
        <li className='navbar-item'>
          <Link to="/AddEdit" className='navbar-link'><img src={ AddEdit } alt="logo-AddEdit" /></Link>
        </li>
        <li className='navbar-item'>
          <Link to="/About" className='navbar-link'><img src={ About } alt="logo-About" /></Link>
        </li>
        <li className='navbar-item'>
          <Link to="/Contact" className='navbar-link'><img src={ Contact } alt="logo-Contact" /></Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
