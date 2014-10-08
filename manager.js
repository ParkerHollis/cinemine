express = require( 'express' );
var app = require('express')();
var request = require("request");

var IP1 = 'localhost';
var url = "http://"+IP1+":4711/stats"

console.log('Attemping to connect to node.');
request({
	url: url,
    json: true
}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('Connection to probe established.')
	} else {
			console.log('Unable to connect to probe.')
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
		convertTime(ms);
		console.log(freeMem+"MB Free | Uptime: "+hours+"h "+minutes+"m "+seconds+"s");
    }
})
}, 1000);

function convertTime(ms) {
	hours = Math.floor(ms / 3600000);
	minutes = Math.floor((ms % 3600000) / 60000);
	seconds = Math.floor(((ms % 360000) % 60000) / 1000);
}