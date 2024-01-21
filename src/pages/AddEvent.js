import React, { useState } from 'react';
import 'firebase/database'

import "./AddEvent.css";
import db from '../firebase.js';
import * as firestore from "firebase/firestore"

import {getFirestore} from 'firebase/firestore/lite';
import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';

function AddEvent() {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [category, setCategory] = useState(''); // New state for category

  const handleSubmit = async () => { 
    

    // db.collection("event").doc().set({
    //     name: eventLocation,
    //     description: eventDescription,
    // }).catch(alert);
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
        orgId: "temp"
      });
      console.log('Document written with ID:', docRef.id);
      await firestore.updateDoc(firestore.doc(eventsCollection, docRef.id), {
        __id: docRef.id,
      });
  
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
  return (
    <div className="AddEvent">
        <p> Add an Event </p>
        <select 
          value = {category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder= "Select Category"
          >
          <option value="" disabled>Select category</option>
            <option value="category1">Food</option>
            <option value="category2">Medical</option>
            <option value="category3">Housing</option>
          </select>
          
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
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

    </div>
  );
}

export default AddEvent;


