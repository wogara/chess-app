import { useState } from 'react';
interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (roomNumber: string) => void;
}
const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ isOpen, onClose, onJoin }) => {
  const [roomNumber, setRoomNumber] = useState('');

  return (
    isOpen && (
      <div style={{ /* Modal styling */ }}>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="Enter Room Number"
        />
        <button onClick={() => onJoin(roomNumber)}>Join</button>
        <button onClick={onClose}>Close</button>
      </div>
    )
  );
}
export default JoinRoomModal;
