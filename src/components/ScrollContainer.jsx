import React from 'react';
import Tile from './Tile';
import AddTile from './AddTile';
import './ScrollContainer.css';

const ScrollContainer = ({ tiles, onSuitChange, onAddTile }) => {
  return (
    <div className="scroll-container">
      <div className="scroll-content">
        <AddTile onAddTile={onAddTile} />
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