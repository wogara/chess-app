// src/hooks/useChessGame.js
import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

const useChessGame = () => {
    const [game, setGame] = useState(new Chess());

    function makeRandomMove() {
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
      
          // illegal move
          if (move === null) return false;
          setTimeout(makeRandomMove, 200);
          return true;
    })    

    const makeAMove = useCallback((move) => {
        const result = game.move(move);
        if (result) {
            setGame(new Chess(game.fen())); // Update the game state if the move is successful
        }
        return result;
    }, [game]);

    const resetGame = useCallback(() => {
        setGame(new Chess()); // Reset or initialize the game
    }, []);

    const isGameOver = useCallback(() => game.game_over() || game.in_draw(), [game]);

    return { game, setGame, makeAMove, resetGame, isGameOver, onDrop };
};

export default useChessGame;

