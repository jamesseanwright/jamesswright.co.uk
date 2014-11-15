var express = require('express'),
		swig = require('swig'),
		app = express(),
		server;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('index', {
		title: 'Yo!',
		description: "Here's the index page!"
	});
});

server = app.listen(3000, function () {
	console.log('Website running on port ' + server.address().port)
});