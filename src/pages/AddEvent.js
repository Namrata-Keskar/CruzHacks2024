import React, { useState, useEffect, useContext } from 'react';
import 'firebase/database'
import { useNavigate, useLocation } from 'react-router-dom';

import "./AddEvent.scss";
import app from '../firebase.js';
import * as firestore from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import UserContext from '../UserContext';

const auth = getAuth(app);
const db = firestore.getFirestore(app);


function AddEvent() {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const navigate = useNavigate();

  const user = useContext(UserContext);

  useEffect(() => {
    console.log('Current userID:', user.loggedInUser.uid);
  }, [user]); 

  const handleSubmit = async () => { 
    
    console.log("event name:", eventName);
    console.log("event date:", eventDate);
    console.log("event location:", eventLocation);
    console.log("event description:", eventDescription);
    const eventsCollection = firestore.collection(db, 'event');

    try {
      const docRef = await firestore.addDoc(eventsCollection, {
        name: eventName,
        catId: "temp",
        location: eventLocation,
        date: eventDate,
        description: eventDescription,
        orgId: user.loggedInUser.uid
      });
      console.log('Document written with ID:', docRef.id);
      await firestore.updateDoc(firestore.doc(eventsCollection, docRef.id), {
        __id: docRef.id,
      });
  
    } catch (error) {
      console.error('Error adding document:', error);
    }
  
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate("/");

    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
  
  return (
    <div className="AddEvent">
        <p> ADD EVENT Page </p>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event details"
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          placeholder="Enter event date"
        />
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Enter event location"
        />
        <textarea
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Enter event description"
        ></textarea>

        <button onClick={handleSubmit}>Submit</button>
        {/* <button>Submit</button> */}

        <button onClick={handleSignOut}>SIGN OUT</button>
    </div>
  );
}

export default AddEvent;


