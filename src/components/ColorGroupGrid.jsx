import React from 'react';
import './ColorGroupGrid.css';

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

const ColorGroupGrid = ({ tiles, showImages = false }) => {
  const getSuitColor = (suitType) => {
    if (suitType === 'heart' || suitType === 'diamond') {
      return 'red';
    }
    return 'black';
  };

  // Group tiles by color alternation
  const columns = [];
  let currentColumn = [];
  let currentColor = null;

  tiles.forEach((tile) => {
    if (tile.suit) {
      const tileColor = getSuitColor(tile.suit);
      
      if (currentColor === null) {
        // First tile
        currentColor = tileColor;
        currentColumn.push(tile);
      } else if (currentColor === tileColor) {
        // Same color, add to current column
        currentColumn.push(tile);
      } else {
        // Color changed, start new column
        columns.push({ color: currentColor, tiles: [...currentColumn] });
        currentColumn = [tile];
        currentColor = tileColor;
      }
    }
  });

  // Push the last column if it has tiles
  if (currentColumn.length > 0) {
    columns.push({ color: currentColor, tiles: currentColumn });
  }

  return (
    <div className="color-group-grid">
      <div className="grid-columns">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className={`grid-column ${column.color}-column`}>
            {column.tiles.map((tile, tileIndex) => (
              <div 
                key={`${colIndex}-${tileIndex}-${tile.id}`}
                className="grid-tile"
                style={{ 
                  color: column.color === 'red' ? '#e74c3c' : '#2c3e50'
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

export default ColorGroupGrid;
