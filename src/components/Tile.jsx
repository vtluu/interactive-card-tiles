import React, { useState, useRef, useEffect } from 'react';
import './Tile.css';

const cardSuits = {
  heart: '♥️',
  spade: '♠️',
  diamond: '♦️',
  club: '♣️'
};

const Tile = ({ suit, onSuitChange, isBlank = true, index }) => {
  const [showSelector, setShowSelector] = useState(false);
  const isClosingRef = useRef(false);

  const handleTileClick = (e) => {
    e.stopPropagation();
    if (isClosingRef.current) {
      return;
    }
    setShowSelector(true);
  };

  const handleSuitSelect = (e, selectedSuit) => {
    e.stopPropagation();
    e.preventDefault();
    isClosingRef.current = true;
    if (onSuitChange) {
      onSuitChange(index, selectedSuit);
    }
    setShowSelector(false);
    setTimeout(() => {
      isClosingRef.current = false;
    }, 300);
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isClosingRef.current = true;
    setShowSelector(false);
    setTimeout(() => {
      isClosingRef.current = false;
    }, 300);
  };

  const getSuitColor = (suitType) => {
    if (suitType === 'heart' || suitType === 'diamond') {
      return '#e74c3c'; // Red for hearts and diamonds
    }
    return '#2c3e50'; // Black for spades and clubs
  };

  return (
    <div 
      className={`tile ${isBlank && !suit ? 'tile-blank' : 'tile-assigned'}`} 
      onClick={handleTileClick}
    >
      <div className="tile-icon" style={{ color: suit ? getSuitColor(suit) : 'white' }}>
        {suit ? cardSuits[suit] : '?'}
      </div>
      
      {showSelector && (
        <div className="suit-selector" onClick={(e) => e.stopPropagation()}>
          <div className="suit-selector-backdrop" onClick={handleBackdropClick} />
          <div className="suit-options">
            <div className="suit-options-grid">
              {Object.entries(cardSuits).map(([suitKey, suitSymbol]) => (
                <button
                  key={suitKey}
                  className="suit-option"
                  onClick={(e) => handleSuitSelect(e, suitKey)}
                  style={{ color: getSuitColor(suitKey) }}
                  title={suitKey.charAt(0).toUpperCase() + suitKey.slice(1)}
                >
                  <span className="suit-symbol">{suitSymbol}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="tile-content">
        <p className="tile-instruction">
          {suit ? 'Click to change' : 'Click to assign'}
        </p>
      </div>
    </div>
  );
};

export default Tile;