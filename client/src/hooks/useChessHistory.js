import { useState } from 'react';

const useChessHistory = (initialFen) => {
  const [fenHistory, setFenHistory] = useState([initialFen]);

  const addFenToHistory = (newFen) => {
    setFenHistory((prevHistory) => [...prevHistory, newFen]);
  };

  const goToPreviousFen = () => {
    if (fenHistory.length > 1) {
      setFenHistory((prevHistory) => prevHistory.slice(0, -1));
    }
    return fenHistory[fenHistory.length - 2] || initialFen;
  };

  const currentFen = fenHistory[fenHistory.length - 1];

  return { addFenToHistory, goToPreviousFen, currentFen, fenHistory };
};