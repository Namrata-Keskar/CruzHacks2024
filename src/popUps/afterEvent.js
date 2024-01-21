import React from 'react';

const afterEvent = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log("HIII");
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <p>Do you want to add another event?</p>
          </div>
          <div className='btnContainer'>
            <button className='btnPrimary'>
              <span className='bold'>YES</span>
            </button>
            <button className='btnOutline'>
              <span className='bold'>Go back to home page</span>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default afterEvent;