// import { useState,useEffect } from 'react';
// import ChessGame from "./components/ChessGame.jsx";
// import ChessRoom from "./components/ChessRoom.jsx";
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [opening, setOpening] = useState(null);

//   useEffect(() => {
//     // Function to ping the /test endpoint
//     const fetchTest = async () => {
//       try {
//         const response = await fetch('/api/test'); // Adjusted for proxy
//         const data = await response.json();
        
//       } catch (error) {
//         console.error('Error fetching /test:', error);
//       }
//     };

//     fetchTest();
//   }, []);

//   return (
//     <div className="container mt-5">
//       {/* <div className='d-flex' role='group' aria-label='Chess openings'>
//         <button type='button' className="btn btn-secondary flex-fill" onClick={() => setOpening("Scotch Game")}>Scotch Opening</button>
//         <button type="button" className="btn btn-secondary flex-fill" onClick={() => setOpening("Italian")}>Italian Game</button>
//         <button type="button" className="btn btn-warning flex-fill" onClick={() => setOpening(null)}>Clear Selection</button>
//       </div>
//       {opening && <ChessGame opening={opening}/>} */}
//       <ChessRoom number={1234}/>
      
//     </div>
//   )
// }

// export default App

import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ChessRoom from './components/ChessRoom';
import ChessGame from './components/ChessGame'; // Assume this is your component for teaching openings
import Home from './components/Home'; // A simple Home component for navigation
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
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

    <Router>
      <div className="container mt-5">
        {/* Navigation and other UI elements can go here */}

        <Routes>
          <Route path="/create-room" element={<ChessRoom number={1234} playerColor={'white'}/>} />
          <Route path="/join-room" element={<ChessRoom number={1234} playerColor={'black'}/>} />
          <Route path="/learn-openings" element={<ChessGame opening={"Italian"} playerColor={'both'} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
