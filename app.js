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
  return 1234;
}
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('createRoom', () => {
    const roomID = generateRoomID();
    console.log('create Room ' + roomID)
    socket.join(roomID);
    socket.emit('roomCreated', {roomID, color:'white'});
    //socket.emit('hello', {message: 'Hello from the server!'});
  });

  socket.on('joinRoom',(roomID) => {
    console.log('join room hit' + roomID);
    const room = io.sockets.adapter.rooms.get(roomID);
    console.log(room);
    if (room && room.size === 1){
      console.log('ROOM JOINED');
      socket.join(roomID);
      socket.emit('roomJoined', {roomID, color: 'black'});
      io.in(roomID).emit('startGame', {roomID});
    }else{
      console.log('error');
      socket.emit('error','Room does not exist or is already full.');
    }
  });

  socket.on('makeMove',({number,move})=>{
    console.log('hit make move');
    console.log(move);
    socket.to(number).emit('makeMove',move);
  })
});

app.get('/',function(req,res){
  res.send('hey');
})

app.get('/api/test',function(req,res){
  console.log('test endpoint hit');
  res.json({message:'Hey'});
})

server.listen(process.env.PORT || 3000, function(){
  console.log("app listening on port 3000");
});
