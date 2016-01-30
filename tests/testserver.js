'use strict';

const express = require('express');
const swig = require('swig');
const app = express();

var server;

app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../tests/unit/client'));

server = app.listen(3001, function () {
	console.log('Running server for client side unit tests...'
		+ '\nPort: ' + server.address().port);
});

process.on('SIGTERM', function () {
	console.log('Ending server process...');
	server.close(function () {
		process.exit(0);
	});
});