var application_root = __dirname,
express = require( 'express' );
var app = express();
var os = require('os');
var osu  = require('os-utils');

app.get( '/stats', function( request, response ) {
	var uptime = Math.round(os.uptime());
	var totalmem = Math.round(os.totalmem());
	var freemem = Math.round(os.freemem());
	var hostname = os.hostname();
	osu.cpuUsage(function(v){
	var CPU = (Math.floor(v*1000))/10;
	var stats = {
                uptime: uptime,
                freemem: freemem,
				totalmem: totalmem,
				cpu: CPU
            };
    response.send(stats);
	});
});
var port = 4711;
app.listen( port, function() {
    console.log( 'Broadcasting probe information on port %d', port);
});