var application_root = __dirname,
express = require( 'express' );
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");
var os  = require('os');
var utils  = require('os-utils');

var IPList = ['192.168.1.148|Macbook'];

IPList.forEach(function(item) {
var address = item.split("|")[0];
var friendlyName = item.split("|")[1];
var url = "http://"+address+":4711/stats"
request({
	url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('Connected to '+friendlyName+' at '+address);
	} else {
			console.log('Unable to connect to '+friendlyName+' at '+address);
	}
})
setInterval(function(){
request({
    url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var uptime = Math.floor(body.uptime);
			var cpu = body.cpu;
			var freeMem = (Math.floor((body.freemem)/1048576));
			var totalMem = (Math.floor((body.totalmem)/1048576));
			var usedMem = totalMem-freeMem;
			log(uptime+"|"+usedMem+"|"+totalMem+"|"+cpu, friendlyName);
		}
	})
}, 2000);

})

function log(message, item) {
	io.emit('data', item+"|"+message);
}

app.get('/', function(req, res){
  res.sendFile(application_root+'/public/index.html');
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

setInterval(function(){
	var uptime = os.uptime();
	var totalMem = (Math.floor((os.totalmem())/1048576));
	var freeMem = (Math.floor((os.freemem())/1048576));
	var usedMem = totalMem-freeMem;
	utils.cpuUsage(function(v){
		var cpu = Math.floor(v*1000)/10;
		io.emit('data', "Manager|"+uptime+"|"+usedMem+"|"+totalMem+"|"+cpu);
	});
}, 2000);