const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
  res.end(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8'));
});
const io = new Server(server);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('drawing', data => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
