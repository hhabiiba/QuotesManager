import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../assets/logo-Home.png';
import AddEdit from '../assets/logo-AddEdit.png';
import About from '../assets/logo-About.png';
import Contact from '../assets/logo-Contact.png';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> <img src={ Home } alt="logo-Home" /></Link>
        </li>
        <li>
          <Link to="/AddEdit"><img src={ AddEdit } alt="logo-AddEdit" /></Link>
        </li>
        <li>
          <Link to="/About"><img src={ About } alt="logo-About" /></Link>
        </li>
        <li>
          <Link to="/Contact"><img src={ Contact } alt="logo-Contact" /></Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
