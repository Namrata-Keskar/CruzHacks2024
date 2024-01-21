import React from 'react';
import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import "./Register.css";

import app from '../firebase.js';
import * as firestore from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../UserContext';

const auth = getAuth(app);
const db = firestore.getFirestore(app);

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgLocation, setOrgLocation] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [error, setError] = useState(false);

  const { loggedInUser, setLoggedInUser } = useUser();
  const navigate = useNavigate();

  const validateInputs = () => {
    console.log("email:", email);
    console.log("password:", password);
    if (!email.includes('@') || !email.includes('.')) {
      setError(true);
      console.log("email error:", error);
      return false;
    }

    if (password.length < 6) {
      setError(true);
      console.log("password error:", error);
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!validateInputs()) {
      console.log("error:", error);
      return; 
    }

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    
    console.log("email:", email);
    console.log("password:", password);
    console.log("org location:", orgLocation);
    console.log("org description:",orgDescription);
    const orgCollection = firestore.collection(db, 'organizations');

    try {
      const docRef = await firestore.addDoc(orgCollection, {
        userId: user.uid,
        email: email,
        orgName: orgName,
        location: orgLocation,
        description: orgDescription,
      });

      console.log('User registered successfully:', user);
      console.log('Document written with ID:', docRef.id);
      // await firestore.updateDoc(firestore.doc(orgCollection, docRef.id), {
      //   __id: docRef.id,
      // });
      console.log("registered in:", user);
      setLoggedInUser(user);
      navigate("/addevent");
  
    } catch (error) {
      console.error('Error adding document:', error);
    }
  
  }

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
        <input 
          type="text" 
          id="name" 
          name="email" 
          placeholder="Email" 
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
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Name" 
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required />
        <input 
          type="location" 
          id="location" 
          name="username" 
          placeholder="Location" 
          value={orgLocation}
          onChange={(e) => setOrgLocation(e.target.value)}
          required />
        <textarea 
          id="description" 
          placeholder="Description" 
          value={orgDescription}
          onChange={(e) => setOrgDescription(e.target.value)}
          required>
        </textarea>


        {/* <Link to="/login"> */}
        <button type="submit" disabled={!!error} onClick={handleSubmit}>
          Sign up
        </button>
        {/* </Link>  */}
        
      </form>
  
    </div>
  );
}

export default Register;
