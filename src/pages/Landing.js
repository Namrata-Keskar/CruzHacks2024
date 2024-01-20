import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Food from './Food';
import Medical from './Medical';
import Housing from './Housing';

import './Landing.scss'; 

function Landing() {
  return (
    <div className="Landing">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

        <h1>
            Find Homeless Services
        </h1>
        
        <div className='PageButtons'>

            <Link to="/food">
                <button>Food and Meals</button>
            </Link>
            
            <Link to="/medical">
                <button>Medical</button>
            </Link>

            <Link to="/housing">
                <button>Housing</button>
            </Link>
    
        </div>

        <div className='login'>
          <p>Are you a service provider?</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>        

    </div>
  );
}

export default Landing;
