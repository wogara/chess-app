import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Chess App</h1>
      <div>
        <Link to="/learn-openings">Learn Chess Openings</Link>
      </div>
      <div>
        <Link to="/create-room">Create a Room</Link> {/* You'll need to handle room creation */}
      </div>
      <div>
        <Link to="/join-room">Join a Room</Link> {/* You'll need to handle room creation */}
      </div>
    </div>
  );
}

export default Home;