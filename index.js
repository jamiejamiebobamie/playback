// Express
var express = require('express');
var app = express();

// Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Chat events when client connects
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
   socket.on('chat message', function(msg){
     io.emit('chat message', msg);
   });
});

// Validate server
var server = http.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d.', server.address().port);
});
