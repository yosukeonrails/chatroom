var socket_io = require('socket.io');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var increment = 0;
var userArray = {};
var connectionIsOn = false;
var data = {
    text: 'someonehas entered the room !',
    online: 0,
};

io.on('connection', function(socket) {

  if(!userArray[socket.id]){
      socket.emit('you are offline');
  }

    socket.on('isTyping', function() {});

    socket.on('MessengerSetUp', function(nickname) {

        userArray[socket.id] = {
            id: socket.id,
            nickname: nickname
        };


        var isOnline = userArray[socket.id].nickname + ' is online';


        socket.broadcast.emit('setNickname', isOnline);

        socket.broadcast.emit('onlineCount', Object.keys(userArray).length);
        socket.emit('onlineCount', Object.keys(userArray).length);

        socket.emit('messengerOn');
        // console.log(userArray);

          console.log(Object.keys(userArray).length);

    });

    console.log(connectionIsOn);

    socket.on('disconnect', function() {

        delete userArray[socket.id];

          socket.broadcast.emit('onlineCount', Object.keys(userArray).length);

        console.log(Object.keys(userArray).length);
        console.log(' client disconneted ');



        // access nickname variable somehow , then broadcast

        socket.emit('closeMessenger');

    });

    // socket.on('disconnect', function() {
    //     console.log( 'SOMEONE LEFT THE ROOOOOOM');
    // });

    console.log('Client connected');

});

io.on('connection', function(socket) {

    console.log('Client connected');

    // socket.broadcast.emit('connection', data.text);
    socket.emit('connection', data.online);

    socket.on('message', function(message) {

        console.log('Received message:', message);
        socket.broadcast.emit('message', message);

    });
});



server.listen(process.env.PORT || 8080);
