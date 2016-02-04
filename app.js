var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Sets the static file folders
app.use("/", express.static(__dirname + "/public"));

// set port
var port = (process.env.PORT || 9000);
server.listen(port, function() {
	console.log('Server now running...');
});


// All other paths result in 404
app.get('*', function(req, res) {
	res.status(404).end();
	// .sendFile(__dirname + '/404.html');
});

