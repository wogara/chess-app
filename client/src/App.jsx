import { useState,useEffect } from 'react';
import ChessGame from "./components/ChessGame.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    // Function to ping the /test endpoint
    const fetchTest = async () => {
      try {
        const response = await fetch('/api/test'); // Adjusted for proxy
        const data = await response.json();
        
      } catch (error) {
        console.error('Error fetching /test:', error);
      }
    };

    fetchTest();
  }, []);

  return (
    <div className="container mt-5">
      <div className='d-flex' role='group' aria-label='Chess openings'>
        <button type='button' className="btn btn-secondary flex-fill" onClick={() => setOpening("Scotch Game")}>Scotch Opening</button>
        <button type="button" className="btn btn-secondary flex-fill" onClick={() => setOpening("Italian")}>Italian Game</button>

        {/* Add more opening buttons as needed */}
        <button type="button" className="btn btn-warning flex-fill" onClick={() => setOpening(null)}>Clear Selection</button> {/* Optional: Allow users to clear the selection */}
      </div>
      {opening && <ChessGame opening={opening}/>}
      
    </div>
  )
}

export default App
