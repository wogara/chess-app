import { useState, useEffect } from 'react';
import {Chess} from 'chess.js';

const useOpeningArrows = (game, filteredOpenings) => {
  const [arrows, setArrows] = useState([]);
  
  //0 index, if return 1 then it's the second move
  const getMoveNumber = (game) => {
    return game.history().length;
  }
  
  const getPgn = (game) => {
    return game.pgn();
  }

  const simplifyPgn = (pgn) => {
    const chess = new Chess();
    chess.load_pgn(pgn);
    const history = chess.history({ verbose: true });
    
    return history.map(move => [move.from, move.to]);
  };

  useEffect(() => {
    if (filteredOpenings[0]) {
      const moveNumber = getMoveNumber(game);
      const total_arrows = simplifyPgn(filteredOpenings[0].moves); // Assuming getPgn(game) gives the correct PGN for current game state
      
      if (moveNumber < total_arrows.length) {
        console.log('setArrows');
        setArrows([total_arrows[moveNumber]]);
      } else {
        setArrows([]); // Clear arrows if the moveNumber is out of bounds
      }
    } else {
      setArrows([]); // Clear arrows if no opening is selected
    }
  }, [game, filteredOpenings]);

  return arrows;
};
export default useOpeningArrows;