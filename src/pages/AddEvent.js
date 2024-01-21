import React, { useEffect, useState, useContext } from 'react';
import AfterEvent from '../popUps/afterEvent.js'

import 'firebase/database'
import { useNavigate, useLocation } from 'react-router-dom';

import "./AddEvent.scss";
import app from '../firebase.js';
import * as firestore from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import UserContext from '../UserContext';

const auth = getAuth(app);
const db = firestore.getFirestore(app);


function AddEvent() {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [openModal, setOpenModal] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topics, setTopics] = useState([]); // State to store the list of topics


  // const collectionRef = firestore.collection(db, 'categories');
  // const q = query(collectionRef, where("__id", "==", "food"));

  
  // useEffect(() => {
  //   const catCollection = firestore.collection(db, 'categories');
  //   console.log("fhdjshf");
  //   catCollection.get().then((firestore.QuerySnapshot) => {
  //     console.log('docs in collection:');
  //     firestore.QuerySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });
  //   // firestore.onSnapshot(firestore.collection(db, "categories"), (snapshot) => {
  //   //   console.log("jii");
  //   //   console.log(snapshot.docs.map(doc => doc.data()));
  //   // });
  // });

  const getCollections = async () => {
    try {
      const dataCollection = firestore.collection(db, "topic");
      const dataSnapshot = await firestore.getDocs(dataCollection);
      console.log("data snapshot:", dataSnapshot);
      const list = dataSnapshot.docs.map(doc => doc.data());
      console.log("list:", list);
      setTopics(list);

    } catch {
      console.log("error");
    }
  }
  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    // Log topics whenever it changes
    console.log("topics in rendering:", topics);
  }, [topics]);


  const navigate = useNavigate();

  const user = useContext(UserContext);

  useEffect(() => {
    console.log('Current userID:', user.loggedInUser.uid);
  }, [user]); 

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
        catId: selectedTopic,
        location: eventLocation,
        date: eventDate,
        description: eventDescription,
        orgId: user.loggedInUser.uid
      });
      console.log('Document written with ID:', docRef.id);
      await firestore.updateDoc(firestore.doc(eventsCollection, docRef.id), {
        __id: docRef.id,
      });
  
    } catch (error) {
      console.error('Error adding document:', error);
    }

  
  }
  // Function that calls both the submit and push function of a button
  const showModal = () =>{
    setOpenModal(false)
    handleSubmit()
  };

  // const useOptions = () => {
  //   const [loading, setLoading] = useState(true);
  //   const [posts, setPosts] = useState([]);
  


  // only add in an async function
  // const snapShot = await getDoc(q);
    // useEffect(() => {
    //   const unsub = firestore.onSnapshot(collectionRef, (querySnapshot) => {
    //     const items = [];
    //     querySnapshot.forEach((doc) =>{
    //       items.push(doc.data());
    //       console.log("HII");
    //       console.log(doc.data().__id);
    //     });
    //     return () => {
    //       unsub();
    //     }

    //   })
    // })

 //}

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate("/");

    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
  
  return (
    // Chunk of code to add information about an event
    <div className="AddEvent">
        <p> ADD EVENT Page </p>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event details"
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

        {/* Now add a drop down bar to see what category they will fall into */}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value={selectedTopic} disabled>Select a topic</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic.id}>
              {topic.id}
            </option>
          ))}
        </select>


        {/* <button onClick={handleSubmit}>Submit</button> */}
        {/* <button>Submit</button> */}
        {/* Whem submit button clicked, information will be passed to firebase
        and then the serivce provider will be asked if they want to add another event.
        If not they will go back to the home page(probably get logged out) */}
        <div>
          <button 
          onClick={() => showModal() } 
          className='modalButton'>
            afterEvent
          </button>
        <AfterEvent
          open={openModal} 
          onClose={() => setOpenModal(false)} />
        </div>

        <button onClick={handleSignOut}>SIGN OUT</button>
    </div>
  );
}

export default AddEvent;


