var express = require('express');
var app = express();
var server = require('http').Server(app);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/game/public'));

app.get('/',function(req, res) {
	console.log(__dirname);
    res.render(__dirname + '/game/views/index.ejs');
});

app.listen(process.env.PORT || 5000, function(){
	console.log("Server Started");
});

var SOCKET_LIST = {};
var coords = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
	console.log("Connection Established");
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		console.log("Connection deleted");
    });
	socket.on('update', function(data){
		coords.x = data.x;
		coords.y = data.y;
	});
});

setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        pack.push({
			x:coords.x,
			y:coords.y 
		});
    } 
	for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('updateRes', pack);
    }
},1000/25);