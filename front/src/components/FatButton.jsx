import React from 'react';
import './FatButton.css';

const FatButton = ({ text, onClick, loading, status }) => {
  return (
    <div className={`button-wrap ${status ? status : ''}`}>
      <button onClick={onClick}>
        {loading ? 'Loading...' : <span>{text}</span>}
      </button>
    </div>
  );
};

export default FatButton;
