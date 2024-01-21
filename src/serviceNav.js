// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="left-link"><Link to="/Login">Log Out</Link></li>
        <li><Link to="/addevent">Add Event</Link></li>
        <li><Link to="">My Events</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;