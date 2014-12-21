'use strict';

var express = require('express'),
	swig = require('swig'),
	fs = require('fs'),
	app = express(),
	server,
	env = process.env.NODE_ENV || 'production',
	viewDir = __dirname + '/views',
	views = fs.readdirSync(viewDir).filter(function (view) { return view.indexOf('.html') > -1; });

require('./utils/polyfills')();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', viewDir);

swig.setDefaults({ 
	cache: env === 'development'
		? false : 'memory'
});

app.get('/:viewName?', function (req, res, next) {
	var view = (req.params.viewName || 'index') + '.html';

	views.includes(view)
		? res.render(view)
		: next(new Error(404));
});

//Error handler
app.use(function (err, req, res, next) {
	res.status(err.message).render('error/' + err.message);
});

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