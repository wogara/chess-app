import { Chess } from 'chess.js';

const chess = new Chess();

// Simulate moves up to the current point in the game
const simulateMoves = (moves) => {
  chess.reset();
  moves.forEach(move => {
    chess.move(move);
  });
};

// Given the next move in PGN format, find the 'from' and 'to' squares
const getNextMoveSquares = (nextMove) => {
  const moveObj = chess.move(nextMove);
  if (moveObj) {
    return { from: moveObj.from, to: moveObj.to };
  } else {
    console.error("Invalid move:", nextMove);
    return null;
  }
};