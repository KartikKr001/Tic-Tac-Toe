require('dotenv').config()
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinGame', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('makeMove', (data) => {
    const { room, board, isXNext } = data;
    socket.to(room).emit('moveMade', { board, isXNext });
  });

  socket.on('resetGame', (room) => {
    io.in(room).emit('gameReset');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
