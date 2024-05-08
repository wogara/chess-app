import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChessRoom from "./components/ChessRoom";
import ChessGame from "./components/ChessGame"; // Assume this is your component for teaching openings
import SelectOpening from "./components/SelectOpening";
import Home from "./components/Home"; // A simple Home component for navigation
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {

  interface ApiResponse {
    status: string;
    data?: any;
  }
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch("/api/test");
        const data: ApiResponse = await response.json();
        console.log(data);
      } catch (error: any) {
        console.error("Error fetching /test:", error);
      }
    };

    fetchTest();
  }, []);
  return (
    <Router>
      <div className="container mt-5">

        <Routes>
          <Route
            path="/create-room"
            element={<ChessRoom playerColor={"white"} />}
          />
          <Route
            path="/join-room/:number"
            element={<ChessRoom playerColor={"black"} />}
          />
          <Route
            path="/classroom"
            element={
              <SelectOpening
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
