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
	console.log(`${req.url} requested`);
	next();
});

app.use(setCacheHeaders);

app.get('/projects', getProjects);
app.get('/blog', getBlog);
app.get('/blog/:slug', getBlogPost);
app.get('/:viewName?', getView);

app.use(handleError);

const server = http.createServer(app);

server.listen(process.env.PORT || 3001, function onBound() {
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
