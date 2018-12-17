var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});



module.exports = app;


// var net = require('net');
// var io = require('socket.io');
//
// var HOST = '127.0.0.1'; // parameterize the IP of the Listen
// var PORT = 6969; // TCP LISTEN port
//
//
// // Create an instance of the Server and waits for a conexão
// net.createServer(function(sock) {
//
//
//     // Receives a connection - a socket object is associated to the connection automatically
//     console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
//
//
//     // Add a 'data' - "event handler" in this socket instance
//     sock.on('data', function(data) {
//         // data was received in the socket
//         // Writes the received message back to the socket (echo)
//         console.log(data.toString());
//         sock.write(data);
//     });
//
//     sock.on('connection', function(socket) {
//          socket.on('chat message', function(msg){
//              console.log("emit");
//              io.emit('chat message', msg);
//          });
//     });
//
//     // Add a 'close' - "event handler" in this socket instance
//     sock.on('close', function(data) {
//         // closed connection
//         console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//     });
//
//
// }).listen(PORT, HOST);
//
//
// console.log('Server listening on ' + HOST +':'+ PORT);