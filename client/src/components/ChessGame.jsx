import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import StockfishBar from "./StockfishBar";
import useChessGame from "../hooks/useChessGame";
import useOpeningArrows from "../hooks/useArrows";
import openingsData from "../data/eco_interpolated.json";
import BackButton from "./BackButton";
import { useStockfish } from "../hooks/useStockfish";

export default function ChessGame({
  opening,
  playerColor,
  sendMove,
  receivedMove,
  showStockfish = true,
}) {
  const { getCurrentGame, resetGame, isGameOver, onDrop, undoMove } =
    useChessGame(playerColor, sendMove, receivedMove);
  const [filteredOpenings, setFilteredOpenings] = useState([]);
  const { evaluation, bestMove, sendCommand } = useStockfish();
  let arrows = [[]];

  if (opening) {
    arrows = useOpeningArrows(getCurrentGame(), filteredOpenings);
  }

  const currentGame = getCurrentGame();
  const currentFen = currentGame.fen();

  // Properly use sendCommand in an effect
  useEffect(() => {
    sendCommand(`position fen ${currentFen}`);
    sendCommand("go depth 10");
  }, [currentFen]);
  console.log("bestMove" + bestMove);
  console.log("evaluation" + evaluation);
  useEffect(() => {
    if (opening) {
      // Convert openingsData to an array of [fen, details] pairs,
      // then filter based on the opening name, and finally map to include the FEN string.
      const filtered = Object.entries(openingsData)
        .filter(([fen, details]) =>
          details.name.toLowerCase().includes(opening.toLowerCase()),
        )
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
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              border: "1px solid #ccc",
            }}
          >
            <Chessboard
              position={currentFen}
              onPieceDrop={onDrop}
              customArrows={arrows}
              boardOrientation={playerColor != "both" ? playerColor : "white"}
            />
            {arrows[0].length > 0 && <BackButton undoMove={undoMove} />}
          </div>
          {isGameOver() && (
            <div className="alert alert-success mt-3" role="alert">
              Checkmate
            </div>
          )}
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            {showStockfish && <StockfishBar evaluation={evaluation} />}
          </div>
        </div>
      </div>
    </div>
  );
}
