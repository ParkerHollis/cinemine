express = require( 'express' );
var app = require('express')();
var request = require("request");

var IP = process.argv[2];
var url = "http://"+IP+"/stats"

console.log('Attemping to connect to node.');
request({
	url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('Connection to probe established.')
	} else {
			console.log('Unable to connect to probe.');
			process.exit(1);
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
			convertTime(ms);
			console.log(freeMem+"MB Free | Uptime: "+days+"d "+hours+"h "+minutes+"m "+seconds+"s | Memory Usage: "+percentMem+"%");
		}
	})
}, 1000);

function convertTime(ms) {
	days = Math.floor(ms / 86400000);
	hours = Math.floor(ms / 3600000) - (days*24);
	minutes = Math.floor((ms % 3600000) / 60000);
	seconds = Math.floor(((ms % 360000) % 60000) / 1000);
}