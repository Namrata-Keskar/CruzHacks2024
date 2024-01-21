import React, { useEffect, useState } from 'react';
import * as firestore from 'firebase/firestore';
import './SharedCard.css'; // Ensure you have a separate CSS file for the component styling
import app from '../firebase.js';

const db = firestore.getFirestore(app);

const SharedCard = ({ category }) => {
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsCollection = firestore.collection(db, 'event');
      const q = firestore.query(eventsCollection, firestore.where('catId', '==', category));

      try {
        const querySnapshot = await firestore.getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        eventsData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });

        setEvents(eventsData);

        const orgIds = eventsData.map(event => event.orgId);
        const orgsCollection = firestore.collection(db, 'organizations');
        const orgsQuerySnapshot = await firestore.getDocs(
          firestore.query(orgsCollection, firestore.where('userId', 'in', orgIds))
        );
        const orgsData = orgsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrganizations(orgsData);
      } catch (error) {
        console.error(`Error fetching ${category} events:`, error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className={`${category}`}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <p className="title">{`${category} Services`}</p>

      {events.map((event, index) => (
        <div key={index} className="service-card">
          <h2>{event.name}</h2>

          {organizations.map(org => {
            if (org.userId === event.orgId) {
              return (
                <div key={org.id}>
                  <p>Organizer: {org.orgName}</p>
                </div>
              );
            }
            return null;
          })}

          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Description: {event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SharedCard;
