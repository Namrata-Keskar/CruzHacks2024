import React from 'react';
import './Housing.css';

function Housing() {
  // Sample data for services (replace this with data from Firebase)
  const servicesData = [
    {
      eventName: 'Event 1',
      organizerName: 'Organizer 1',
      date: '2022-01-20',
      location: 'Location 1',
      description: 'Description 1',
    },
    {
      eventName: 'Event 2',
      organizerName: 'Organizer 2',
      date: '2022-01-21',
      location: 'Location 2',
      description: 'Description 2',
    },
    // Add more service data as needed
  ];

  return (
    <div className="Housing">
      <p class="title">Housing Services</p>

      {/* Loop through servicesData and create a card for each service */}
      {servicesData.map((service, index) => (
        <div key={index} className="service-card">
          <h2>{service.eventName}</h2>
          <p>Organizer: {service.organizerName}</p>
          <p>Date: {service.date}</p>
          <p>Location: {service.location}</p>
          <p>Description: {service.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Housing;
