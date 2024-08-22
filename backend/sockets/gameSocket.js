module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('a user connected', socket.id);
  
      // Join a specific game room
      socket.on('joinGame', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
      });
  
      // Handle a move
      socket.on('makeMove', (data) => {
        const { room, board, isXNext } = data;
        socket.to(room).emit('moveMade', { board, isXNext });
      });
  
      socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
      });
    });
  };
  