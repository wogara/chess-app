import { useState,useEffect } from 'react'
import ChessGame from "./components/ChessGame.jsx";
import './App.css'

function App() {
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    // Function to ping the /test endpoint
    const fetchTest = async () => {
      try {
        const response = await fetch('/api/test'); // Adjusted for proxy
        const data = await response.json();
        console.log(data.message); // Logs "Hey" from the server response
      } catch (error) {
        console.error('Error fetching /test:', error);
      }
    };

    fetchTest();
  }, []);
  return (
    <>
      <button onClick={() => setOpening("Scotch")}>Scotch Opening</button>
      <button onClick={() => setOpening("Italian")}>Italian Game</button>
      {/* Add more opening buttons as needed */}
      <button onClick={() => setOpening(null)}>Clear Selection</button> {/* Optional: Allow users to clear the selection */}

      {opening && <ChessGame opening={opening}/>}
      
    </>
  )
}

export default App
