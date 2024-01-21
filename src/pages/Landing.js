import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css'; 

function Landing() {
  return (
    <div className="Landing">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

        <h1>
            HomeBase
        </h1>

        <h2>
            Ending homelessness one step at a time
        </h2>
        
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
            <Link to="/servicelanding">
                <button>Login</button>
            </Link>
        </div>        

    </div>
  );
}

export default Landing;
