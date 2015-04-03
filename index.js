var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var numberOfUser = 0;
io.on('connection', function(socket){
  numberOfUser++;
  io.emit('number', numberOfUser);
  
  console.log('a user connected');
  console.log('Number of Connected user = '+numberOfUser);
    
  socket.on('chat message', function(msg){
	console.log('chat message', msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
	numberOfUser--;
	io.emit('number', numberOfUser);
    console.log('user disconnected');
	console.log('Number of Connected user = '+numberOfUser);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
