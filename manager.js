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
		var uptime = body.uptime;
		var freeMem = (Math.floor((body.freemem)/1048576));
		var totalMem = (Math.floor((body.totalmem)/1048576));
		console.log(freeMem+"MB Free | Uptime: "+uptime+"s");
    }
})
}, 1000);