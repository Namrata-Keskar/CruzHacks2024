import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';
import Map from './Map.js';

const db = firestore.getFirestore(app);

function Food() {
  return (
    
    <div className='food'>
    <Navbar/>
    <div className='info'>
      <div>
        <SharedCard category="Food" />
      </div>
      <div className='map'>
        <Map />
      </div>

    </div>
  </div>

  );
}

export default Food;
