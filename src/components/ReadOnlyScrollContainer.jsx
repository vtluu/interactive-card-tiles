import React from 'react';
import ReadOnlyTile from './ReadOnlyTile';
import './ReadOnlyScrollContainer.css';

const ReadOnlyScrollContainer = ({ tiles, showImages = false }) => {
  return (
    <div className="readonly-scroll-container">
      <div className="readonly-scroll-content">
        {tiles.map((tile, index) => (
          <ReadOnlyTile
            key={`readonly-tile-${index}-${tile.id || index}`}
            suit={tile.suit}
            isBlank={!tile.suit}
            showImages={showImages}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadOnlyScrollContainer;
