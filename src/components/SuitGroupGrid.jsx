import React from 'react';
import './SuitGroupGrid.css';

const cardSuits = {
  heart: '♥️',
  spade: '♠️',
  diamond: '♦️',
  club: '♣️'
};

const themedImages = {
  spade: '🚀',
  diamond: '💍',
  heart: '💑',
  club: '🐝'
};

const SuitGroupGrid = ({ tiles, showImages = false }) => {
  const getSuitColor = (suitType) => {
    if (suitType === 'heart' || suitType === 'diamond') {
      return 'red';
    }
    return 'black';
  };

  // Group tiles by suit alternation
  const columns = [];
  let currentColumn = [];
  let currentSuit = null;

  tiles.forEach((tile) => {
    if (tile.suit) {
      if (currentSuit === null) {
        // First tile
        currentSuit = tile.suit;
        currentColumn.push(tile);
      } else if (currentSuit === tile.suit) {
        // Same suit, add to current column
        currentColumn.push(tile);
      } else {
        // Suit changed, start new column
        columns.push({ suit: currentSuit, tiles: [...currentColumn] });
        currentColumn = [tile];
        currentSuit = tile.suit;
      }
    }
  });

  // Push the last column if it has tiles
  if (currentColumn.length > 0) {
    columns.push({ suit: currentSuit, tiles: currentColumn });
  }

  return (
    <div className="suit-group-grid">
      <div className="grid-columns">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className={`grid-column ${getSuitColor(column.suit)}-suit`}>
            {column.tiles.map((tile, tileIndex) => (
              <div 
                key={`${colIndex}-${tileIndex}-${tile.id}`}
                className="grid-tile"
                style={{ 
                  color: getSuitColor(column.suit) === 'red' ? '#e74c3c' : '#2c3e50'
                }}
              >
                <span className="grid-tile-icon">
                  {showImages ? themedImages[tile.suit] : cardSuits[tile.suit]}
                </span>
              </div>
            ))}
          </div>
        ))}
        {columns.length === 0 && (
          <div className="empty-grid-message">
            No tiles assigned yet. Click tiles above to assign suits!
          </div>
        )}
      </div>
    </div>
  );
};

export default SuitGroupGrid;
