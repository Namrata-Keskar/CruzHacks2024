import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';

const db = firestore.getFirestore(app);

function Medical() {
  return (
    <div className="Medical">
      <Navbar/>
      <SharedCard category="medical" />
      
        <p>
            MEDICAL Page
        </p>
        
    </div>
  );
}

export default Medical;
