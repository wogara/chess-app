import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JoinRoomModal from './JoinRoomModal';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = (roomNumber) => {
    setIsModalOpen(false); // Close the modal
    navigate(`/join-room/${roomNumber}`); // Navigate to the room
  };

  return (
    // <div>
    //   <h1>Welcome to the Chess App</h1>
    //   <div>
    //     <Link to="/learn-openings">Learn Chess Openings</Link>
    //   </div>
    //   <div>
    //     <Link to="/create-room">Create a Room</Link> {/* You'll need to handle room creation */}
    //   </div>
    //   <div>
    //     <Link to="/join-room">Join a Room</Link> {/* You'll need to handle room creation */}
    //   </div>
    // </div>
    <div>
      <h1>Welcome to the Chess App</h1>
      <div>
        <Link to="/learn-openings">Learn Chess Openings</Link>
      </div>
      <div>
        <Link to="/create-room">Create a Room</Link>
      </div>
      <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
        Join a Room {/* Make it clickable */}
      </div>
      <JoinRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoin={handleJoinRoom}
      />
    </div>
  );
}

export default Home;
