import React, { useState } from 'react';
import {app} from '../firebase';
import 'firebase/database'

import firebase from 'firebase/app';
import db from '../firebase.js';
import * as firestore from "firebase/firestore"
//import firebase from 'firebase/app';

import {getFirestore} from 'firebase/firestore/lite';
import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';

function AddEvent() {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  // const handleSubmit = () => { 
  //   db.collection("event").doc().set({
  //     name: eventLocation,
  //     description: eventDescription,
  // }).catch(alert);
  // }

  
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
          type="text"
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
        <input
        type="text"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        placeholder="Enter event location"
      />

      {/* <button onClick={handleSubmit}>Submit</button> */}

    </div>
  );
}

export default AddEvent;


