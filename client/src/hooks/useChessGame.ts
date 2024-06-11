//@ts-nocheck

import { useState, useCallback } from "react";
import { Chess } from "chess.js";

const useChessGame = (
  playerColor: "white" | "black" | "both",
  sendMove?: (move: object) => void,
  receivedMove?: string,
) => {
  const [game, setGame] = useState(new Chess());
  const [player, setPlayer] = useState(playerColor);

  const getCurrentGame = useCallback(() => {
    return game;
  }, [game]);

  const undoMove = useCallback(() => {
    const pgn = game.pgn();
    const newGame = new Chess();
    newGame.load_pgn(pgn);
    newGame.undo();
    setGame(newGame);
  }, [game]);

  const makeAMove = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      const currentGame = getCurrentGame();
      const result = currentGame.move(move);
      if (result) {
        const pgn = currentGame.pgn();
        const newGame = new Chess();
        newGame.load_pgn(pgn);
        newGame.move(move);
        setGame(newGame);
      }
      return result;
    },
    [getCurrentGame],
  );

  const onDrop = useCallback(
    (sourceSquare: string, targetSquare: string): boolean => {
      if (
        (game.turn() === "w" && player === "white") ||
        (game.turn() === "b" && player === "black") ||
        player === "both"
      ) {
        const move = makeAMove({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move === null) {
          return false;
        }
        if (sendMove) {
          sendMove(move);
        }

        return true;
      } else {
        return false;
      }
    },
    [game, player, makeAMove, sendMove],
  );

  if (receivedMove) {
    makeAMove(receivedMove);
  }

  const resetGame = useCallback(() => {
    setGame(new Chess());
  }, []);

  const isGameOver = useCallback(() => {
    return game.game_over() || game.in_draw();
  }, [game]);

  return { getCurrentGame, makeAMove, resetGame, isGameOver, onDrop, undoMove };
};

export default useChessGame;
