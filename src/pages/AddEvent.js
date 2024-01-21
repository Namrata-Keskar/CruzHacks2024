import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Timestamp } from 'firebase/firestore';


import AfterEvent from '../popUps/afterEvent.js'

import 'firebase/database'
import Navbar from '../serviceNav';

import { useNavigate, useLocation } from 'react-router-dom';

import "./AddEvent.css";
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topics, setTopics] = useState([]); // State to store the list of topics
  // const [canSubmit, setCanSubmit] = useState(false);

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
    console.log("event name:", eventName);
    console.log("event date:", eventDate);
    console.log("event location:", eventLocation);
    console.log("event description:", eventDescription);
    
    // if (
    //   eventName.trim() === "" ||
    //   eventDate.trim() === "" ||
    //   eventLocation.trim() === "" ||
    //   eventDescription.trim() === "" ||
    //   selectedTopic.trim() === ""
    // ) {
    //   console.error('Please fill in all fields');
    //   toast.error('Please fill in all fields');

    // }  else {
    //   setCanSubmit(true);
    // }

      const eventsCollection = firestore.collection(db, 'event');

      try {
        const docRef = await firestore.addDoc(eventsCollection, {
          name: eventName,
          catId: selectedTopic,
          location: eventLocation,
          date: new Date(eventDate).toISOString(), //Timestamp.fromDate(new Date(eventDate)), // Convert JavaScript date to Firestore timestamp
          description: eventDescription,
          orgId: user.loggedInUser.uid
        });
        console.log('Document written with ID:', docRef.id);
        await firestore.updateDoc(firestore.doc(eventsCollection, docRef.id), {
          __id: docRef.id,
        });
        clearFields();

        setOpenModal(true);
        setTimeout(() => {
          setOpenModal(false);
        }, 1500);

      } catch (error) {
        console.error('Error adding document:', error);
      }
    
  }

  // Function that calls both the submit and push function of a button
  const showModal = () =>{
    setOpenModal(true)
    handleSubmit()
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate("/");

    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const clearFields = () => {
    setEventName('');
    setEventDate('');
    setEventLocation('');
    setEventDescription('');
    setSelectedTopic('');
  };

  const goToMyEvents = async () => {
    navigate("/myevents");
  }
  
  return (
    // Chunk of code to add information about an event
    <div className="AddEvent">
      <Navbar/>
      <ToastContainer position="bottom-right"/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      
        <p> ADD EVENT Page </p>

        {/* Now add a drop down bar to see what category they will fall into */}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic.id}>
              {topic.id}
            </option>
          ))}
        </select>
          
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
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

        {/* Whem submit button clicked, information will be passed to firebase
        and then the serivce provider will be asked if they want to add another event.
        If not they will go back to the home page(probably get logged out) */}
        <div>
          <button 
          onClick={() => showModal(true) } 
          className='modalButton'
          disabled={
            eventName.trim() === "" ||
            eventDate.trim() === "" ||
            eventLocation.trim() === "" ||
            eventDescription.trim() === "" ||
            selectedTopic.trim() === ""
          }        
          >
            Submit Event
          </button>
          <AfterEvent
            open={openModal} 
            onClose={() => setOpenModal(false)} />
        </div>

        <button className="signOut" onClick={handleSignOut}>SIGN OUT</button>
        {/* <button className="signOut" onClick={goToMyEvents}>My Events</button> */}
    </div>
  );
}

export default AddEvent;


