import { useState } from 'react';

export default function SelectOpeningModal({ isOpen, onClose}) {
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
 
