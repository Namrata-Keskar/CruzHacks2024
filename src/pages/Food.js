import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory


const db = firestore.getFirestore(app);

function Food() {
  return (
    <SharedCard category="food" />
  );
}

export default Food;
