import React from 'react';

const FatButton = ({ text, onClick, status, loading }) => {
  // "status" is expected to be "success", "error", or an empty string.
  return (
    <div
      className={`button-wrap ${status}`}
      style={{ display: 'inline-block' }}  // ensures container only takes up content size
    >
      <button onClick={onClick}>
        <span>
          {loading ? <div className="loader"></div> : text}
        </span>
      </button>
      <div className="button-shadow"></div>
    </div>
  );
};

export default FatButton;
