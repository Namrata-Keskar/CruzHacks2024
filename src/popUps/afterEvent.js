import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./afterEvent.css"

const afterEvent = ({ open, onClose }) => {

  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub:ital@1&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Krub&family=Montserrat&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log("HIII");
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </p>

          <div className='content'>
            <p>Event Added!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default afterEvent;