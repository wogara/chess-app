import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import {Chess} from "chess.js";
import useChessGame from '../hooks/useChessGame';
import useOpeningArrows from '../hooks/useArrows'; // Import your custom hook
import openingsData from '../data/eco_interpolated.json';
import BackButton from './BackButton';
import { useStockfish } from '../hooks/useStockfish';

export default function ChessGame({opening}) {
  const {getCurrentGame, resetGame, isGameOver, onDrop, undoMove} = useChessGame();
  const [filteredOpenings, setFilteredOpenings] = useState([]);
  const stockfish = useStockfish();
  const arrows = useOpeningArrows(getCurrentGame(),filteredOpenings);
  //console.log("ARROWS");
  //console.log(arrows);]
  const currentGame = getCurrentGame();
  const currentFen = currentGame.fen();

  // const analyzePosition = (fen) => {
  //   stockfish.sendCommand(`position fen ${fen}`);
  //   stockfish.sendCommand("go depth 20");
  // }
  stockfish.sendCommand(`position fen ${currentFen}`);
  stockfish.sendCommand("go depth 20");
  

  useEffect(() => {

  
    if (opening) {
      // Convert openingsData to an array of [fen, details] pairs,
      // then filter based on the opening name, and finally map to include the FEN string.
      const filtered = Object.entries(openingsData)
        .filter(([fen, details]) => details.name.toLowerCase().includes(opening.toLowerCase()))
        .map(([fen, details]) => ({ fen, ...details })); // Includes the FEN string in the result
      console.log(filtered);
      setFilteredOpenings(filtered);
      resetGame();
    } else {
      setFilteredOpenings([]);
    }
  }, [opening]);
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', border: '1px solid #ccc' }}>
            <Chessboard 
              position={currentFen} 
              onPieceDrop={onDrop}
              customArrows={arrows}
            />
            <BackButton undoMove={undoMove}/>
          </div>
          {isGameOver() && <div className="alert alert-success mt-3" role="alert">Checkmate</div>}
        </div>
      </div>
    </div>
  );
}

