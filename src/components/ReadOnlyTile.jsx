import React from 'react';
import './ReadOnlyTile.css';

const cardSuits = {
  heart: '♥️',
  spade: '♠️',
  diamond: '♦️',
  club: '♣️'
};

const ReadOnlyTile = ({ suit, isBlank = true }) => {
  const getSuitColor = (suitType) => {
    if (suitType === 'heart' || suitType === 'diamond') {
      return '#e74c3c'; // Red for hearts and diamonds
    }
    return '#2c3e50'; // Black for spades and clubs
  };

  return (
    <div 
      className={`readonly-tile ${isBlank && !suit ? 'readonly-tile-blank' : 'readonly-tile-assigned'}`}
    >
      <div className="readonly-tile-icon" style={{ color: suit ? getSuitColor(suit) : '#999' }}>
        {suit ? cardSuits[suit] : '?'}
      </div>
    </div>
  );
};

export default ReadOnlyTile;
