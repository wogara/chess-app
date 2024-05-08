import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoinRoomModal from "./JoinRoomModal";

function Home() {
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = (roomNumber: string) => {
    setIsJoinRoomModalOpen(false); // Close the modal
    navigate(`/join-room/${roomNumber}`); // Navigate to the room
  };

  return (
    <div>
      <h1>Welcome to the Chess App</h1>
      <div>
        <Link to="/classroom" className="button-link">
          Classroom
        </Link>
      </div>
      <div>
        <Link to="/create-room">Create a Room</Link>
      </div>
      <div onClick={() => setIsJoinRoomModalOpen(true)} style={{ cursor: "pointer" }}>
        Join a Room {/* Make it clickable */}
      </div>
      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={() => setIsJoinRoomModalOpen(false)}
        onJoin={handleJoinRoom}
      />
    </div>
  );
}

export default Home;
