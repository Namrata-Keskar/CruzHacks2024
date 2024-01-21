// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  
  return (
    <nav className="navbar">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <ul>
        <li><Link to="/addevent">Add Event</Link></li>
        <li><Link to="/myevents">My Events</Link></li>
        <li className="left-link"><Link to="/">Log Out</Link></li>
        {/* <li><Link to="/profile">My Profile</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;