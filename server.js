'use strict';

const express = require('express');
const swig = require('swig');
const notifyValimate = require('valimate-notifier');
const http = require('http');

const app = express();
const env = process.env.NODE_ENV || 'production';
const getBlog = require('./routes/getBlog');
const getBlogPost = require('./routes/getBlogPost');
const getProjects = require('./routes/getProjects');
const getView = require('./routes/getView');
const setCacheHeaders = require('./routes/setCacheHeaders');
const redirectToHttps = require('./routes/redirectToHttps');
const handleError = require('./routes/handleError');

const IS_DEVELOPMENT = env !== 'production';

require('./init')();

app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({
	cache: IS_DEVELOPMENT
		? false
		: 'memory',

	locals: {
		currentYear() {
			return new Date().getFullYear();
		},

		isAnalyticsDisabled() {
			return IS_DEVELOPMENT;
		}
	}
});

app.use((req, res, next) => {
	console.log(`${new Date()} - ${req.url} requested`);
	next();
});

app.get('.well-known/acme-challenge/zV3BgsYZeDV726wrneTdUI7jxqilzQVLBFKTCwFf7Xo', (req, res, next) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	
	res.end('zV3BgsYZeDV726wrneTdUI7jxqilzQVLBFKTCwFf7Xo.XAHUidcd2vu5uo7jdxzAt2C0vXDscTLTFSf6iHE0kWY');
});

if (!IS_DEVELOPMENT) {
	app.use(redirectToHttps);
}

app.use(setCacheHeaders);

app.get('/projects', getProjects);
app.get('/blog', getBlog);
app.get('/blog/:slug', getBlogPost);
app.get('/:viewName?', getView);

app.use(handleError);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, function onBound() {
	console.log('Website running on port ' + server.address().port
		+ '\nEnvironment: ' + env);

	notifyValimate(true);
});

process.on('SIGTERM', function die() {
	console.log('Ending server process...');

	server.close(() => {
		process.exit(0);
	});
});
