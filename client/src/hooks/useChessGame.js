// src/hooks/useChessGame.js
import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';

const useChessGame = (playerColor, sendMove, receivedMove) => {
    const [game, setGame] = useState(new Chess());
    const [player, setPlayer] = useState(playerColor);
    
    const getCurrentGame = useCallback(()=>{
        
        return game;
    },[game])

    const undoMove = useCallback(() => {
        const pgn = game.pgn();
        const newGame = new Chess();
        newGame.load_pgn(pgn);
        newGame.undo();
        setGame(newGame);
    }, [game]);

    function makeRandomMove() {
        const game = getCurrentGame();
        const possibleMoves = game.moves();
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }
    
      
    const onDrop = useCallback((sourceSquare,targetSquare) => {

        if ((game.turn() === 'w' && player === 'white') || game.turn() === 'b' && player === 'black' || player==='both'){
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          });
      
          
          if (move === null) {
            return false;
          }
          sendMove(move);
          return true;
        } else{
            return false;
        }
    })    

    const makeAMove = useCallback((move) => {
        
        const currentGame = getCurrentGame();
        const result = currentGame.move(move);
        if (result) {
            const pgn = game.pgn();
            const newGame = new Chess();
            newGame.load_pgn(pgn);
            newGame.move(move);
            setGame(newGame);
            //setGame(game.move(move));
            //console.log(currentGame.pgn());
        }
        return result;
    }, [getCurrentGame]);
    if (receivedMove){
        makeAMove(receivedMove);
    }
    
    const resetGame = useCallback(() => {
        setGame(new Chess());
    }, []);

    const isGameOver = useCallback(() => {
        return game.game_over() || game.in_draw();
    }, [game]);
    

    return { getCurrentGame, makeAMove, resetGame, isGameOver, onDrop, undoMove};
};

export default useChessGame;

