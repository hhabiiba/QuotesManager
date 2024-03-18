import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="nav-links">
        <h3>Nav-links</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/AddEdit">Add/Edit Quote</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li><Link to="/category/Inspirational">Inspirational</Link></li>
          <li><Link to="/category/Motivational">Motivational</Link></li>
          <li><Link to="/category/Love">Love</Link></li>
          <li><Link to="/category/Friendship">Friendship</Link></li>
          <li><Link to="/category/Funny">Funny</Link></li>
          <li><Link to="/category/Islamic">Islamic</Link></li>
          <li><Link to="/category/Urdu-Hindi">Urdu/Hindi</Link></li>
          <li><Link to="/category/Other">Other</Link></li>
        </ul>
      </div>
      <div className="user-options">
        <h3>User Options</h3>
        <ul>
          <li>Login/Logout</li>
          <li>My Profile</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
