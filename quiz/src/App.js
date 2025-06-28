import React, { useState, useEffect } from 'react';
import './App.css';
//Images used
const bananaImg = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const chickenImg = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
//Tile count
const TOTAL_TILES = 9;

function generateRandomTiles() {
  const types = Array(TOTAL_TILES).fill(null).map(() =>
    Math.random() < 0.5 ? 'banana' : 'chicken'
  );
  return types;
}
//Main
function App() {
  const [tiles, setTiles] = useState([]);
  const [revealed, setRevealed] = useState(Array(TOTAL_TILES).fill(false));
  const [playerChoice, setPlayerChoice] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    resetGame();
  }, []);

  //Reset
  const resetGame = () => {
    setTiles(generateRandomTiles());
    setRevealed(Array(TOTAL_TILES).fill(false));
    setGameOver(false);
    setWinner(null);
    setPlayerChoice(null);
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };
//Logic
  const handleTileClick = (index) => {
    if (gameOver || revealed[index] || playerChoice === null) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (tiles[index] !== playerChoice) {
      setGameOver(true);
      setWinner(`Opponent (You clicked ${tiles[index]} instead of ${playerChoice})`);
    } else {
      // Check if all matching tiles are clicked
      const matched = newRevealed.filter((rev, i) => rev && tiles[i] === playerChoice).length;
      const totalNeeded = tiles.filter((t) => t === playerChoice).length;
      if (matched === totalNeeded) {
        setGameOver(true);
        setWinner('You Win! +5 to you');
      }
    }
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>
      {!playerChoice && (
        <div className="choice-buttons">
          <button onClick={() => handleChoice('banana')}>I'm Banana 🍌</button>
          <button onClick={() => handleChoice('chicken')}>I'm Chicken 🐔</button>
        </div>
      )}

      {playerChoice && !gameOver && (
        <p>You're playing as: <strong>{playerChoice}</strong>. Click only {playerChoice}s!</p>
      )}

      <div className="grid">
        {tiles.map((type, index) => (
          <div key={index} className="square" onClick={() => handleTileClick(index)}>
            {revealed[index] ? (
              <img src={type === 'banana' ? bananaImg : chickenImg} alt={type} />
            ) : (
              <div className="hidden-tile">{index + 1}</div>
            )}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>{winner}</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
