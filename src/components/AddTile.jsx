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
    <button className="add-tile" onClick={handleClick} title="Add New Tile">
      +
    </button>
  );
};

export default AddTile;