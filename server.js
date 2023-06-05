const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Kök dizin için GET isteğine yanıt verme
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO bağlantısı üzerinde olay dinleyicileri tanımlama
io.on('connection', (socket) => {
  console.log('Yeni bir kullanıcı bağlandı.');

  // "chat message" olayını dinleme
  socket.on('chat message', (msg) => {
    console.log('Alınan mesaj: ' + msg);

    // "chat message" olayını tüm bağlantılara yayma
    io.emit('chat message', msg);
  });

  // Bağlantı kesildiğinde
  socket.on('disconnect', () => {
    console.log('Bir kullanıcı bağlantısını kopardı.');
  });
});

// Sunucuyu belirtilen port üzerinde dinlemeye başlama
const port = 3000;
server.listen(port, () => {
  console.log('Sunucu dinleniyor. Port: ' + port);
});
