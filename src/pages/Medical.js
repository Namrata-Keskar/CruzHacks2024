import React from 'react';
import app from '../firebase.js';
import * as firestore from 'firebase/firestore';
import SharedCard from '../card/SharedCard'; // Assuming SharedCard.js is in the same directory
import Navbar from '../consumerNav';
import Map from './Map.js';

const db = firestore.getFirestore(app);

function Medical() {
  return (
    // <div className="Medical">
    //   <Navbar/>
    //   <SharedCard category="Medical" />
    // </div>
    <div className='medical'>
      <Navbar/>
      <div className='info'>
        <div>
          <SharedCard category="Medical" />
        </div>
        <div className='map'>
          <Map />
        </div>

      </div>
    </div>
  );
};

export default Medical;
