import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./Login.scss";

import app from '../firebase.js';
import * as firestore from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import UserContext from '../UserContext';
import { useUser } from '../UserContext';


const auth = getAuth(app);
const db = firestore.getFirestore(app);


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // const {loggedInUser, setLoggedInUser} = useContext(UserContext);
  // console.log('Use Context user at start:', loggedInUser);
  // setLoggedInUser("CHANGED USER");
  // console.log('Use Context user at start:', loggedInUser);
  const { loggedInUser, setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    console.log("Clicked submit");
    console.log("email:", email);
    console.log("password:", password);
    e.preventDefault();
  
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      
      // navigate("/addevent");
      onAuthStateChanged(auth, (user) => {
        console.log("in login in:", user);
        // navigate('/addevent', { state: { user } });
        // setUser({loggedInUser: user});
        setLoggedInUser(user);
        navigate("/addevent");

      });

    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error.message);
    }

    console.log("after try catch");

  };

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
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="Username" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={!!error}
          >Login</button>
        
      </form>

        
    </div>
  );
}

export default Login;
