import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChessGame from './ChessGame';
const SERVER_URL = 'http://localhost:3000';
let socket;
export default function ChessRoom({number,playerColor}) {

    const [receivedMove, setReceivedMove] = useState(null);
    console.log(receivedMove);
    useEffect(() => {
        // Initialize Socket.IO client
        socket = io(SERVER_URL);
    
        if (playerColor === 'white') {
          socket.emit('createRoom',  number );
          //setPlayerColor('white'); // Creator plays as white
        } else if (playerColor === 'black') {
          socket.emit('joinRoom',  number );
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
      }, [number, playerColor]);
    const sendMove = (move) => {
        console.log('sendMove hit');
        socket.emit('makeMove',{number,move})
    }
    return (
        <div>
            <h1>{number}</h1>
            <ChessGame opening="Italian" playerColor={playerColor} sendMove={sendMove} receivedMove={receivedMove}/>
        </div>
        
    )
}