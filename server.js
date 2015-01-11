'use strict';

var express = require('express');
var swig = require('swig');
var app = express();
var server;
var env = process.env.NODE_ENV || 'production';
var getView = require('./routes/getView');
var handleError = require('./routes/handleError');
var getProjects = require('./routes/getProjects');
var getClientTests = require('./routes/getClientTests');
var isDevelopment = env === 'development';
var isTest = env === 'test';

require('./utils/polyfills')();

app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ 
	cache: isDevelopment
		? false
		: 'memory'
});

app.get('/projects', getProjects);
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