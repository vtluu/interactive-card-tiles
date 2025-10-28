import React, { useState } from 'react'
import ScrollContainer from './components/ScrollContainer'
import ReadOnlyScrollContainer from './components/ReadOnlyScrollContainer'
import './App.css'

function App() {
  // Initial tiles with blank cards showing "?" symbols
  const [tiles, setTiles] = useState([
    { id: 1, suit: null },
    { id: 2, suit: null },
    { id: 3, suit: null },
    { id: 4, suit: null },
    { id: 5, suit: null }
  ]);
  
  // Track the initial 5 tile IDs
  const initialTileIds = [1, 2, 3, 4, 5];

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
  // - After initial 5 are assigned, show FIRST 5 assigned tiles (most recent) + auto-assign new tiles
  const assignedTiles = tiles.filter(tile => tile.suit !== null);
  
  // Check if all initial 5 tiles are assigned
  const initialTiles = tiles.filter(tile => initialTileIds.includes(tile.id));
  const initialTilesAssigned = initialTiles.length === 5 && initialTiles.every(tile => tile.suit !== null);
  
  let diamondTiles, heartTiles, clubTiles, spadeTiles;
  
  if (!initialTilesAssigned) {
    // Stage 1-3: Show only assigned tiles, mirroring main scroll
    diamondTiles = assignedTiles;
    heartTiles = assignedTiles;
    clubTiles = assignedTiles;
    spadeTiles = assignedTiles;
  } else {
    // Stage 4+: Show first 5 assigned tiles (most recent, from left) + auto-assign new unassigned tiles
    const first5Assigned = assignedTiles.slice(0, 5);
    const unassignedTiles = tiles.filter(tile => tile.suit === null);
    
    diamondTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'diamond' })),
      ...first5Assigned
    ];
    
    heartTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'heart' })),
      ...first5Assigned
    ];
    
    clubTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'club' })),
      ...first5Assigned
    ];
    
    spadeTiles = [
      ...unassignedTiles.map(tile => ({ ...tile, suit: 'spade' })),
      ...first5Assigned
    ];
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Card Tiles</h1>
        <p>Click on tiles to assign card suits (♥️ ♠️ ♦️ ♣️) • Use the + button to add new tiles</p>
      </header>
      
      <main className="app-main">
        <ScrollContainer 
          tiles={tiles} 
          speed={30} 
          onSuitChange={handleSuitChange}
          onAddTile={handleAddTile}
        />
        
        <div className="readonly-scrolls-container">
          <ReadOnlyScrollContainer tiles={diamondTiles} />
          <ReadOnlyScrollContainer tiles={heartTiles} />
          <ReadOnlyScrollContainer tiles={clubTiles} />
          <ReadOnlyScrollContainer tiles={spadeTiles} />
        </div>
      </main>
    </div>
  )
}

export default App
