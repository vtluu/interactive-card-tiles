import React from 'react';
import './AddTile.css';

const AddTile = ({ onAddTile }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onAddTile) {
      onAddTile();
    }
  };

  return (
    <div className="add-tile" onClick={handleClick}>
      <div className="add-tile-icon">
        +
      </div>
      <div className="add-tile-content">
        <p className="add-tile-text">Add New Tile</p>
      </div>
    </div>
  );
};

export default AddTile;