import { useEffect, useState, useRef, useCallback } from "react";

export const useStockfish = () => {
  const [evaluation, setEvaluation] = useState("");
  const [bestMove, setBestMove] = useState("");

  const workerRef = useRef(null);
  function normalizeChessScore(scoreCp) {
    const MAX_CP = 300; // Maximum cp for normalization
    const MIN_CP = -300; // Minimum cp for normalization

    if (scoreCp > MAX_CP) {
      return 100;
    } else if (scoreCp < MIN_CP) {
      return -100;
    } else {
      return (scoreCp / MAX_CP) * 100;
    }
  }
  const parseStockfishOutput = (data) => {

    // Adjusted regex to capture both positive and negative scores
    const scoreMatch = data.match(/score cp (-?\d+)/);
    if (scoreMatch) {
      let stockfishScore = parseInt(scoreMatch[1],10);
      let normalizedScore = normalizeChessScore(stockfishScore);
      setEvaluation(normalizedScore);
      console.log("stockfish score: " + stockfishScore);
      console.log("Normalized Score: " + normalizedScore); // Log the matched score
    }

    // Updated regex to capture the entire move sequence following 'pv'
    const moveMatch = data.match(/pv ([a-h1-8]+[a-h1-8]+(?:[qrbn])?)/);
    if (moveMatch) {
      setBestMove(moveMatch[1]);
    }
  };

  useEffect(() => {
    workerRef.current = new Worker("/stockfish-nnue-16-single.js");
    workerRef.current.onmessage = (event) => {
      parseStockfishOutput(event.data);
    };

    workerRef.current.postMessage("uci");

    return () => workerRef.current.terminate();
  }, []);

  const sendCommand = useCallback((command) => {
    workerRef.current?.postMessage(command);
  }, []);

  return { evaluation, bestMove, sendCommand };
};
