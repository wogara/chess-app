// src/hooks/useStockfish.js
import { useEffect, useState } from 'react';
import StockfishWrapper from '../utils/StockfishWrapper.js';

export const useStockfish = () => {
  const [output, setOutput] = useState('');
  let stockfish = new StockfishWrapper();

//   const sendCommand = (command) => {
//     stockfish.sendCommand(command);
//   }
//   useEffect(() => {
//     // Example: Setting a custom message handler
//     console.log('stockfish wrapper useEffect');
//     stockfish.stockfishWorker.onmessage = (event) => {
//       setOutput(event.data);
//     };

//     // Cleanup
//     return () => stockfish.stockfishWorker.terminate();
//   }, []);

  return { output, sendCommand: stockfish.sendCommand };
};