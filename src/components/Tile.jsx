import React, { useState, useRef, useEffect } from 'react';
import './Tile.css';

const cardSuits = {
  heart: '♥️',
  spade: '♠️',
  diamond: '♦️',
  club: '♣️'
};

const themedImages = {
  spade: '🚀',    // Spaceship for spade
  diamond: '💍',  // Diamond ring for diamond
  heart: '💑',    // Couple/sweetheart for heart
  club: '🐝'      // Bee for club
};

const Tile = ({ suit, onSuitChange, isBlank = true, index, showImages = false }) => {
  const [showSelector, setShowSelector] = useState(false);
  const isClosingRef = useRef(false);
  const touchStartRef = useRef(null);

  const handleTileClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isClosingRef.current) {
      return;
    }
    setShowSelector(true);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (!touchStartRef.current) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };
    
    const deltaX = Math.abs(touchEnd.x - touchStartRef.current.x);
    const deltaY = Math.abs(touchEnd.y - touchStartRef.current.y);
    const deltaTime = touchEnd.time - touchStartRef.current.time;
    
    // Only trigger if it's a tap (not a scroll/swipe)
    if (deltaX < 10 && deltaY < 10 && deltaTime < 300) {
      if (!isClosingRef.current) {
        setShowSelector(true);
      }
    }
    
    touchStartRef.current = null;
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
    }, 350);
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isClosingRef.current = true;
    setShowSelector(false);
    setTimeout(() => {
      isClosingRef.current = false;
    }, 350);
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="tile-icon" style={{ color: suit ? getSuitColor(suit) : 'white' }}>
        {suit ? (showImages ? themedImages[suit] : cardSuits[suit]) : '?'}
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
                  onTouchEnd={(e) => handleSuitSelect(e, suitKey)}
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
    </div>
  );
};

export default Tile;