'use strict';

var express = require('express'),
	swig = require('swig'),
	fs = require('fs'),
	app = express(),
	server,
	isDevelopment = process.env.NODE_ENV === 'development',
	viewDir = __dirname + '/views',
	views = fs.readdirSync(viewDir);

fs.closeSync(viewDir);

console.log('views', views);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', viewDir);
swig.setDefaults({ cache: !isDevelopment });


app.get('/:pageName', function (req, res, next) {
	var view = views[req.params.pageName || 'index'];
	res.render(view);
});

//404 error handler
app.use(function (err, req, res, next) {
	err.detail === 404 ? res.render('error/404') : next(err);
});

//generic (500 for now) error handler
app.use(function (err, req, res) {
	res.render('error/500');
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