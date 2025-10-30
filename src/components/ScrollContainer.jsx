import React from 'react';
import Tile from './Tile';
import './ScrollContainer.css';

const ScrollContainer = ({ tiles, onSuitChange }) => {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {tiles.map((tile, index) => (
          <Tile
            key={`tile-${index}-${tile.id || index}`}
            suit={tile.suit}
            onSuitChange={onSuitChange}
            index={index}
            isBlank={!tile.suit}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollContainer;