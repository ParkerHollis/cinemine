var application_root = __dirname,
express = require( 'express' );
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");

var IPList = ['127.0.0.1|Razer'];

IPList.forEach(function(item) {
var address = item.split("|")[0];
var friendlyName = item.split("|")[1];
var url = "http://"+address+":4711/stats"
request({
	url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			
	} else {
			
	}
})
setInterval(function(){
request({
    url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var uptime = Math.floor(body.uptime);
			var freeMem = (Math.floor((body.freemem)/1048576));
			var totalMem = (Math.floor((body.totalmem)/1048576));
			var usedMem = totalMem-freeMem;
			log(uptime+"|"+usedMem+"|"+totalMem, friendlyName);
		}
	})
}, 1000);

function convertTime(ms) {
	days = Math.floor(ms / 86400000);
	hours = Math.floor(ms / 3600000) - (days*24);
	minutes = Math.floor((ms % 3600000) / 60000);
	seconds = Math.floor(((ms % 360000) % 60000) / 1000);
}
})

function log(message, item) {
	io.emit('data', item+"|"+message);
	console.log(item+"|"+message);
}

app.get('/', function(req, res){
  res.sendFile(application_root+'/index.html');
});

 app.get(/^(.+)$/, function(req, res){ 
     res.sendFile( __dirname + req.params[0]); 
 });

http.listen(4000, function(){
  
});

io.on('connection', function(socket){
  io.emit('IPList', IPList);
  socket.on('disconnect', function(){
    io.emit('IPList', '');
  });
});