import React, {useContext, useState, useEffect} from 'react';
import './MyEvents.css';

import app from '../firebase.js';
import * as firestore from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const db = firestore.getFirestore(app);


function MyEvents() {
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});

  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext);

  // Sample data for services (replace this with data from Firebase)
  // const servicesData = [
  //   {
  //     eventName: 'Event 1',
  //     organizerName: 'Organizer 1',
  //     date: '2022-01-20',
  //     location: 'Location 1',
  //     description: 'Description 1',
  //   },
  //   {
  //     eventName: 'Event 2',
  //     organizerName: 'Organizer 2',
  //     date: '2022-01-21',
  //     location: 'Location 2',
  //     description: 'Description 2',
  //   },
  //   // Add more service data as needed
  // ];


  // console.log("In my events user:", loggedInUser.uid);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/servicelanding');
    }
  }, [loggedInUser, navigate]);

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsCollection = firestore.collection(db, 'event');
      const q = firestore.query(eventsCollection, firestore.where('orgId', '==', loggedInUser.uid));

      try {
        const querySnapshot = await firestore.getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData);

        const orgIds = eventsData.map(event => event.orgId);
        const orgsCollection = firestore.collection(db, 'organizations');
        const orgsQuerySnapshot = await firestore.getDocs(
          firestore.query(orgsCollection, firestore.where('userId', 'in', orgIds))
        );
        const orgsData = orgsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrganizations(orgsData);
      } catch (error) {
        console.error(`Error fetching events:`, error);
      }
    };

    fetchData();
  }, [events]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
      
  //       try {
  //           const eventsCollection = firestore.collection(db, 'event');
  //           const querySnapshot = await firestore.getDocs(eventsCollection);
            
  //           const eventsData = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  //           setEvents(eventsData);
  //           console.log("all events:", eventsData);
  //       } catch (error) {
  //           console.error('Error fetching events:', error.message);
  //       }
        
  //   };

  //   fetchEvents();
  // }, [loggedInUser]);

  const handleEdit = (event) => {
    setEditMode(true);
    setEditedEvent(event);
  };

  const handleSave = async () => {
    console.log("clicked saved for:", editedEvent);

    try {
      const eventsCollection = firestore.collection(db, 'event');
      console.log("edited event id:", editedEvent.__id);

      const docRef = firestore.doc(eventsCollection, editedEvent.__id);
      console.log("doc ref:", docRef);

      const docSnapshot = await firestore.getDoc(docRef);
        if (docSnapshot.exists()) {
            console.log("doc snapshot:", docSnapshot.data());
        } else {
            console.log("NO DOC DATA");
        }

      console.log("The changed description is")
      console.log(editedEvent.description)
      await firestore.updateDoc(firestore.doc(eventsCollection, editedEvent.__id), {
        name: editedEvent.name,
        date: editedEvent.date,
        location: editedEvent.location,
        description: editedEvent.description,
      });

    //   setEditMode(false);
    //   setEditedEvent({});
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
    setEditMode(false);
    setEditedEvent({});
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedEvent({});
  };

  const handleChange = (field, value) => {
    setEditedEvent((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="MyEvents">
      <p class="title">My Events</p>
      {events.map((event, index) => (
        <div key={index} className="service-card">
          {editMode && editedEvent.__id === event.id ? (
            <div class="editing-fields">
              <label>Event name</label>
              <input
                type="text"
                value={editedEvent.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <label>Date</label>
              <input
                type="text"
                value={editedEvent.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              <label>Location</label>
              <input
                type="text"
                value={editedEvent.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
              <label>Description</label>
              <textarea
                value={editedEvent.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{event.name}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
            </div>
          )}
        </div>
      ))}


    </div>
  );
}

export default MyEvents;
