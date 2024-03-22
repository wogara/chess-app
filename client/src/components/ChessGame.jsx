import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import {Chess} from "chess.js";
import useChessGame from '../hooks/useChessGame';
import openingsData from '../data/eco_interpolated.json';
import BackButton from './BackButton';

export default function ChessGame({opening}) {
  const {getCurrentGame, resetGame, isGameOver, onDrop, undoMove} = useChessGame();
  const [filteredOpenings, setFilteredOpenings] = useState([]);

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
  
  const currentFen = getCurrentGame().fen();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', border: '1px solid #ccc' }}>
            <Chessboard 
              position={currentFen} 
              onPieceDrop={onDrop}
            />
            <BackButton undoMove={undoMove}/>
          </div>
          {isGameOver() && <div className="alert alert-success mt-3" role="alert">Checkmate</div>}
        </div>
      </div>
    </div>
  );
}

