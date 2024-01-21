import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';

const db = firestore.getFirestore(app);

function Food() {
  return (
    
    <div className="Food">
      <Navbar/>
      <SharedCard category="food" />
        <p>
            FOOD Page
        </p>
        
    </div>
  );
}

export default Food;
