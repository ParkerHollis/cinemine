var application_root = __dirname,
express = require( 'express' );
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");

var IPList = ["localhost:4711", "localhost:4712", "localhost:4713"];

IPList.forEach(function(item) {
var url = "http://"+item+"/stats"
log('Attemping to connect.', item);
request({
	url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			log('Connection established.', item)
	} else {
			log('Unable to connect.', item);
	}
})
setInterval(function(){
request({
    url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var ms = Math.floor(body.uptime*1000);
			var freeMem = (Math.floor((body.freemem)/1048576));
			var totalMem = (Math.floor((body.totalmem)/1048576));
			var usedMem = totalMem-freeMem;
			var percentMem = Math.floor((usedMem/totalMem)*100);
			var hostName = body.name;
			convertTime(ms);
			log(freeMem+"MB Free | Uptime: "+days+"d "+hours+"h "+minutes+"m "+seconds+"s | Memory Usage: "+percentMem+"%", item);
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
	console.log(item+' | '+message);
}

app.get('/', function(req, res){
  res.sendFile(application_root+'/index.html');
});

 app.get(/^(.+)$/, function(req, res){ 
     res.sendFile( __dirname + req.params[0]); 
 });

http.listen(4000, function(){
  
});