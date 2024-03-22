// src/hooks/useChessGame.js
import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

const useChessGame = () => {
    const [fenHistory, setFenHistory] = useState([new Chess().fen()]);

    const getCurrentGame = useCallback(()=>{
        
        return new Chess(fenHistory[fenHistory.length-1]);
    },[fenHistory])

    function makeRandomMove() {
        const game = getCurrentGame();
        const possibleMoves = game.moves();
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }
    
      
    const onDrop = useCallback((sourceSquare,targetSquare) => {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          });
      
          
          if (move === null) {
            return false;
          }
          
          return true;
    })    

    const makeAMove = useCallback((move) => {
        
        const currentGame = getCurrentGame();
       
        const result = currentGame.move(move);
        if (result) {
            setFenHistory(prevFenHistory => [...prevFenHistory, currentGame.fen()]);

        }
        return result;
    }, [getCurrentGame]);

    const resetGame = useCallback(() => {
        setFenHistory([new Chess().fen()]); // Reset or initialize the game
    }, []);

    const isGameOver = useCallback(() => {
        const game = getCurrentGame();
        return game.game_over() || game.in_draw();
    }, [getCurrentGame]);

    return { getCurrentGame, makeAMove, resetGame, isGameOver, onDrop };
};

export default useChessGame;

