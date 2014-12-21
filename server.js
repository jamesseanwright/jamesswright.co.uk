'use strict';

var express = require('express'),
	swig = require('swig'),
	app = express(),
	server,
	env = process.env.NODE_ENV || 'production',
	getView = require('./routes/getView'),
	handleError = require('./routes/handleError');

require('./utils/polyfills')();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ 
	cache: env === 'development'
		? false : 'memory'
});

app.get('/:viewName?', getView);
app.use(handleError);

server = app.listen(3000, function () {
	console.log('Website running on port ' + server.address().port
		+ '\nEnvironment: ' + env);
});

process.on('SIGTERM', function () {
	console.log('Ending server process...');
	server.close(function () {
		process.exit(0);
	});
});