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

app.get('/', function (req, res) {
	res.render('index');
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