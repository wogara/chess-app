import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import {Chess} from "chess.js";
import useChessGame from '../hooks/useChessGame';
import openingsData from '../data/eco_interpolated.json';

export default function ChessGame({opening}) {
  const {game, makeAMove, resetGame, isGameOver, onDrop} = useChessGame();
  const [filteredOpenings, setFilteredOpenings] = useState([]);
  console.log("is game over" + isGameOver());
  console.log(filteredOpenings);

  useEffect(() => {
    const openingsArray = Object.values(openingsData);
    if (opening) {
      const filtered = openingsArray.filter(op => op.name.toLowerCase().includes(opening.toLowerCase()));
      setFilteredOpenings(filtered);
      resetGame();
    } else {
      setFilteredOpenings([]);
    }
  }, [opening]);

  
  return (
    <div style={{ width: "600px", height: "600px", border: "1px solid black" }}>
      <Chessboard 
        position={game.fen()} 
        onPieceDrop={onDrop} 
      />
      {isGameOver() && <h1>Game Over</h1>} {/* Conditionally render the game over message */}
    </div>
    
  )
}

