import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';
import Map from './Map.js';
import "./Housing.css";

const db = firestore.getFirestore(app);

function Housing() {
  return (
    <div className='housing'>
      <Navbar/>

      <div className='info'>

        <div>
          <SharedCard category="Housing" />
        </div>
        <div className='map'>
          <Map />
        </div>

      </div>
      

    </div>
  );
}

export default Housing;
