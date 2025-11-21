import React, { useState } from 'react'
import ScrollContainer from './components/ScrollContainer'
import ReadOnlyScrollContainer from './components/ReadOnlyScrollContainer'
import AddTile from './components/AddTile'
import ToggleImageButton from './components/ToggleImageButton'
import ColorGroupGrid from './components/ColorGroupGrid'
import './App.css'

function App() {
  // Initial tiles with blank cards showing "?" symbols
  const [tiles, setTiles] = useState([
    { id: 1, suit: null },
    { id: 2, suit: null },
    { id: 3, suit: null },
    { id: 4, suit: null },
    { id: 5, suit: null },
    { id: 6, suit: null }
  ]);
  
  // Track the initial 6 tile IDs
  const initialTileIds = [1, 2, 3, 4, 5, 6];
  
  // Toggle between card suits and themed images
  const [showImages, setShowImages] = useState(false);

  const handleSuitChange = (index, suit) => {
    setTiles(prevTiles => 
      prevTiles.map((tile, i) => 
        i === index ? { ...tile, suit } : tile
      )
    );
  };

  const handleAddTile = () => {
    const newTile = {
      id: Date.now(), // Simple ID generation
      suit: null
    };
    setTiles(prevTiles => [newTile, ...prevTiles]); // Add to the beginning
  };

  // Bottom scrolls logic:
  // - Show only assigned tiles from main scroll
  // - After initial 6 are assigned, show FIRST 6 assigned tiles (most recent) + auto-assign new tiles
  const assignedTiles = tiles.filter(tile => tile.suit !== null);
  
  // Check if all initial 6 tiles are assigned
  const initialTiles = tiles.filter(tile => initialTileIds.includes(tile.id));
  const initialTilesAssigned = initialTiles.length === 6 && initialTiles.every(tile => tile.suit !== null);
  
  let diamondTiles, heartTiles, clubTiles, spadeTiles;
  
  if (!initialTilesAssigned) {
    // Stage 1-3: Show only assigned tiles, mirroring main scroll
    diamondTiles = assignedTiles;
    heartTiles = assignedTiles;
    clubTiles = assignedTiles;
    spadeTiles = assignedTiles;
  } else {
    // Stage 4+: Show first 6 assigned tiles (most recent, from left) + auto-assign new unassigned tiles
    const first6Assigned = assignedTiles.slice(0, 6);
    const unassignedTiles = tiles.filter(tile => tile.suit === null);
    
    diamondTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'diamond' })),
      ...first6Assigned
    ];
    
    heartTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'heart' })),
      ...first6Assigned
    ];
    
    clubTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'club' })),
      ...first6Assigned
    ];
    
    spadeTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'spade' })),
      ...first6Assigned
    ];
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Card Tiles</h1>
      </header>
      
      <main className="app-main">
        <div className="add-tile-container">
          <AddTile onAddTile={handleAddTile} />
          <ToggleImageButton 
            onToggle={() => setShowImages(!showImages)} 
            showImages={showImages}
          />
        </div>
        
        <ScrollContainer 
          tiles={tiles} 
          speed={30} 
          onSuitChange={handleSuitChange}
          showImages={showImages}
        />
        
        <div className="readonly-scrolls-container">
          <ReadOnlyScrollContainer tiles={diamondTiles} showImages={showImages} />
          <ReadOnlyScrollContainer tiles={heartTiles} showImages={showImages} />
          <ReadOnlyScrollContainer tiles={clubTiles} showImages={showImages} />
          <ReadOnlyScrollContainer tiles={spadeTiles} showImages={showImages} />
        </div>
        
        <ColorGroupGrid tiles={tiles} showImages={showImages} />
      </main>
    </div>
  )
}

export default App
