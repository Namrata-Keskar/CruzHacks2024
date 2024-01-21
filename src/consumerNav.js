// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="left-link"><Link to="/">Home</Link></li>
        <li><Link to="/food">Food</Link></li>
        <li><Link to="/medical">Medical</Link></li>
        <li><Link to="/housing">Housing</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;