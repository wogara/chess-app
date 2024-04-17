const express = require('express');
const {Server} = require("socket.io");
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:'http://localhost:5173',
    methods: ['GET','POST']
  }
});
function generateRoomID(){
  return uuidv4();
}
io.on('connection', (socket) => {
  
  socket.on('createRoom', (roomID) => {
    
    console.log('create Room ' + roomID)
    socket.join(roomID);
    socket.emit('roomCreated', {roomID, color:'white'});
    
  });

  socket.on('joinRoom',(roomID) => {
    
    const room = io.sockets.adapter.rooms.get(roomID);
    
    if (room && room.size === 1){
      console.log('ROOM JOINED');
      socket.join(roomID);
      socket.emit('roomJoined', {roomID, color: 'black'});
      io.in(roomID).emit('startGame', {roomID});
    }else{
      
      socket.emit('error','Room does not exist or is already full.');
    }
  });

  socket.on('makeMove',({roomNumber,move})=>{
    
    socket.to(roomNumber).emit('makeMove',move);
  })
});

app.get('/',function(req,res){
  res.send('m715q');
})

app.get('/api/test',function(req,res){
  res.json({message:'Hey'});
})

server.listen(process.env.PORT || 3000, function(){
  console.log("app listening on port 3000");
});
