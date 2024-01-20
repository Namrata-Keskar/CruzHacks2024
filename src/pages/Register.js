import React from 'react';
import { Link } from 'react-router-dom';

import "./Register.css";

function Register() {
  return (
    <div className="Register">
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <p className='register'>
        Register your service here
      </p>

      <form>
        <input type="text" id="name" name="username" placeholder="Username" required />
        <input type="password" id="password" name="password" placeholder="Password" required />
        <input type="location" id="location" name="username" placeholder="Location" required />
        <textarea id="description" placeholder="Description" required></textarea>


        <Link to="/addevent">
          <button type="submit">Login</button>
        </Link>
        
      </form>
  
    </div>
  );
}

export default Register;
