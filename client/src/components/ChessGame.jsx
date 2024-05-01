import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import useChessGame from '../hooks/useChessGame';
import useOpeningArrows from '../hooks/useArrows'; 
import openingsData from '../data/eco_interpolated.json';
import BackButton from './BackButton';
import { useStockfish } from '../hooks/useStockfish';

export default function ChessGame({opening,playerColor,sendMove, receivedMove}) {
  const {getCurrentGame, resetGame, isGameOver, onDrop, undoMove} = useChessGame(playerColor,sendMove,receivedMove);
  const [filteredOpenings, setFilteredOpenings] = useState([]);
  const stockfish = useStockfish();
  let arrows = [[]];
  
  if (opening){
    arrows = useOpeningArrows(getCurrentGame(),filteredOpenings);
    console.log('arrows');
    console.log(arrows);
  }
  

  const currentGame = getCurrentGame();
  const currentFen = currentGame.fen();

  stockfish.sendCommand(`position fen ${currentFen}`);
  stockfish.sendCommand("go depth 1");
  

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
              boardOrientation={playerColor!='both'?playerColor:'white'}
            />
            {arrows[0].length > 0 && <BackButton undoMove={undoMove}/>}
            
          </div>
          {isGameOver() && <div className="alert alert-success mt-3" role="alert">Checkmate</div>}
        </div>
        
        {arrows[0].length > 0 && <div className='col-lg-2'><progress value={50} max={100}/></div>}
        
      </div>
    </div>
  );
}

