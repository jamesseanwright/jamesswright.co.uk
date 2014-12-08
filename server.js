'use strict';

var express = require('express'),
		swig = require('swig'),
		app = express(),
		server;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
	res.render('index');
});

server = app.listen(3000, function () {
	console.log('Website running on port ' + server.address().port)
});

process.on('SIGTERM', function () {
	console.log('Ending server process...')
	server.close(function () {
		process.exit(0);
	});
});