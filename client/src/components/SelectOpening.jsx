import { useState } from "react";
import ChessGame from './ChessGame.jsx';

export default function SelectOpening() {
  const [selectedOpening, setSelectedOpening] = useState("");
  
  const openings = [
    { id: "italian", name: "Italian Game" },
    { id: "ruylopez", name: "Ruy Lopez" },
  ];

  const handleSelectOpening = (event) => {
    setSelectedOpening(event.target.value);
  };
  return (
    <div>
      <label htmlFor="opening-selector">Choose an opening:</label>
      <select
        id="opening-selector"
        value={selectedOpening}
        onChange={handleSelectOpening}
      >
        <option value="">Select an opening...</option>
        {openings.map((opening) => (
          <option key={opening.id} value={opening.id}>
            {opening.name}
          </option>
        ))}

       </select>
       {selectedOpening && <ChessGame opening={"Italian"} playerColor={'both'} sendMove={null} receivedMove={null}/>}
     
    </div>
  );
}
