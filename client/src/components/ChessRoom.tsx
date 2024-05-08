import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import ChessGame from './ChessGame';
import { humanId } from 'human-id';
import { useParams } from 'react-router-dom';
const SERVER_URL = 'http://localhost:3000';
let socket: Socket;
interface ChessRoomProps {
  playerColor: 'white' | 'black' | 'both'; 
}
const ChessRoom: React.FC<ChessRoomProps> = ({playerColor}) => {

    const [receivedMove, setReceivedMove] = useState(null);
    const {number: number} = useParams();
    const [roomNumber, setRoomNumber] = useState(number || '');
    console.log(receivedMove);
    useEffect(() => {
        // Initialize Socket.IO client
        socket = io(SERVER_URL);
    
        if (playerColor === 'white') {
          const number = humanId();
          socket.emit('createRoom', number );
          setRoomNumber(number);
        } else if (playerColor === 'black') {
          socket.emit('joinRoom',  roomNumber );
        }
    
        socket.on('makeMove', (move) => {
          console.log('received make move' + move);
          setReceivedMove(move);
        });
    
        return () => {
          socket.off('gameStateUpdated');
          socket.disconnect();
        };
      }, [playerColor]);
    const sendMove = (move: string) => {
        console.log('sendMove hit');
        console.log(roomNumber);
        socket.emit('makeMove',{roomNumber,move})
    }
    return (
        <div>
            <h1>{roomNumber}</h1>
            <h4>Playing as {playerColor}</h4>
            <ChessGame opening={null} playerColor={playerColor} sendMove={sendMove} receivedMove={receivedMove}/>
        </div>
        
    )
}

export default ChessRoom;
