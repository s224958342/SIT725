const express = require('express');
const path = require('path')
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);

});

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});