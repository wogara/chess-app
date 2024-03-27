import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChessGame from './ChessGame';
import { humanId } from 'human-id';
import { useParams } from 'react-router-dom';
const SERVER_URL = 'http://localhost:3000';
let socket;
export default function ChessRoom({playerColor}) {

    const [receivedMove, setReceivedMove] = useState(null);
    const {number: number} = useParams();
    const [roomNumber, setRoomNumber] = useState(number || '');
    console.log(receivedMove);
    useEffect(() => {
        // Initialize Socket.IO client
        socket = io(SERVER_URL);
    
        if (playerColor === 'white') {
          let number = humanId();
          socket.emit('createRoom', number );
          setRoomNumber(number);
          //setPlayerColor('white'); // Creator plays as white
        } else if (playerColor === 'black') {
          socket.emit('joinRoom',  roomNumber );
          //setPlayerColor('black'); // Joiner plays as black
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
    const sendMove = (move) => {
        console.log('sendMove hit');
        console.log(roomNumber);
        socket.emit('makeMove',{roomNumber,move})
    }
    return (
        <div>
            <h1>{roomNumber}</h1>
            <ChessGame opening={null} playerColor={playerColor} sendMove={sendMove} receivedMove={receivedMove}/>
        </div>
        
    )
}