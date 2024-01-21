import React from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="Profile">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

        <p className='profile'>
            Update your information
        </p>
      <form>
        <input type="text" id="name" name="username" placeholder="Username" required />
        <input type="location" id="location" name="username" placeholder="Location" required />
        <input type="updates" id="updates" name="updates" placeholder="Updates" required />
        {/* <textarea id="description" placeholder="Description" required></textarea> */}

        
        <Link to="/">
          <button type="submit">Log Out</button>
        </Link>
        
      </form>
    </div>
  );
}

export default Profile;