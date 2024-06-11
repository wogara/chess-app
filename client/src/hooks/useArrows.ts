import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

type Arrow = [string, string];
type Move = {
  color: string;
  from: string;
  to: string;
  flags: string;
  piece: string;
  san: string;
  captured?: string;
  promotion?: string;
};

const useOpeningArrows = (game: Chess, filteredOpenings: any[]): Arrow[] => {
  const [arrows, setArrows] = useState < Arrow[] > ([]);

  const getMoveNumber = (game: Chess) => {
    return game.history().length;
  };

  const simplifyPgn = (pgn: string) => {
    const chess = new Chess();
    chess.load_pgn(pgn);
    const history = chess.history({ verbose: true }) as Move[];
    console.log("HISTORY");
    console.log(history);

    return history.map(move => [move.from, move.to ] as Arrow);
  };

  useEffect(() => {
    if (filteredOpenings[0]) {
      const moveNumber = getMoveNumber(game);
      const total_arrows = simplifyPgn(filteredOpenings[0].moves);
      console.log("Total arrows" + total_arrows);

      if (moveNumber < total_arrows.length) {
        setArrows([total_arrows[moveNumber]]);
      } else {
        setArrows([]); // Clear arrows if the moveNumber is out of bounds
      }
    } else {
      setArrows([]); // Clear arrows if no opening is selected
    }
  }, [game, filteredOpenings]);

  return arrows;
};

export default useOpeningArrows;

