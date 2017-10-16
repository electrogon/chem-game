var socket = io();
var ctx;

function update(x, y, ctx){
	ctx = ctx;
	socket.emit('update', {x:x, y:y});
}

socket.on('updateRes', function(data){
	ctx.fillRect(data.x, data.y, 10, 10); 
});