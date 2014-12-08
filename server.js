'use strict';

var express = require('express'),
		swig = require('swig'),
		app = express(),
		server,
		isDevelopment = process.env.NODE_ENV === 'development';

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: !isDevelopment });


// TODO: make routes dynamic?
app.get('/', function (req, res) {
	res.render('index');
});

app.get('/about-me', function (req, res) {
	res.render('about-me');
});

server = app.listen(3000, function () {
	console.log('Website running on port ' + server.address().port);
	console.log('Environment: ' + process.env.NODE_ENV || 'production');
});

process.on('SIGTERM', function () {
	console.log('Ending server process...')
	server.close(function () {
		process.exit(0);
	});
});