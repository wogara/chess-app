import React from 'react';
import './StockfishBar.css'; // Assuming you store CSS styles in this file

export default function StockfishBar({evaluation}) {
  const MAX_VALUE = 400; // This could be dynamic based on state or props
  const progressValue = evaluation + MAX_VALUE/2;
  return (
    <div className="stockfish-bar">
      <div className="progress-container">
        <progress value={progressValue} max={MAX_VALUE} />
      </div>
    </div>
  );
}

