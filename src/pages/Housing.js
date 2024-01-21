import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';

const db = firestore.getFirestore(app);

function Housing() {
  return (
    <div>
    <Navbar/>
      <SharedCard category="housing" />
    </div>
  );
}

export default Housing;
