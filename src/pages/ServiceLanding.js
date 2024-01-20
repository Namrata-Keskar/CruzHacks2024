import React from 'react';
import { Link } from 'react-router-dom';

import './ServiceLanding.css'; 


function ServiceLanding() {
  return (
    <div className="ServiceLanding">

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />


        <h2 className='loginText'>
            Log in to
        </h2>

        <h1 className='title'>
            TITLE
        </h1>

        <div className='buttons'>
            <Link to="/login">
                <button>Sign In</button>
            </Link>
            <Link to="/register">
                <button>Sign Up</button>
            </Link>
        </div>

    </div>
  );
}

export default ServiceLanding;
