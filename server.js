var express = require('express');
var path = require("path");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];
var connections = [];
var port = 8000;

// Chat events when client connects
app.use(express.static(path.join(__dirname, "public")));

server.listen(port || 8000, function() {
    console.log("Listening to port: " + port);
});

io.on("connection", function(socket) {
    console.log("New connection made!");

    //add to list of connections for socket
    connections.push(socket);
    console.log("connected: ", connections.length);

    //disconnect
    socket.on("disconnect", function(data) {
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
        console.log("connected: ", connections.length);
    });

    //recieving and publishing messages
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg
        //user: socket.username //not yet implemented
        );
    });
});