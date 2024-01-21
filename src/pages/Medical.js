import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory


const db = firestore.getFirestore(app);

function Medical() {
  return (
    <SharedCard category="medical" />
  );
}

export default Medical;
