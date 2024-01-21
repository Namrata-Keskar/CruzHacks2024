import React from 'react';
import { Link } from 'react-router-dom';

import "./Login.scss";

function Login() {
  return (
    <div className="Login">
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <p className='login'>
        Login
      </p>

      <form>
        <input type="text" id="username" name="username" placeholder="Username" required />

        <input type="password" id="password" name="password" placeholder="Password" required />

        <Link to="/addevent">
          <button type="submit">Login</button>
        </Link>
        
      </form>

        
    </div>
  );
}

export default Login;
