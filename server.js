'use strict';

const express = require('express');
const swig = require('swig');
const notifyValimate = require('valimate-notifier');
const http = require('http');

const app = express();
const env = process.env.NODE_ENV || 'production';
const getAcmeKeyAuth = require('./routes/getAcmeKeyAuth');
const getBlog = require('./routes/getBlog');
const getBlogPost = require('./routes/getBlogPost');
const getProjects = require('./routes/getProjects');
const getView = require('./routes/getView');
const setCacheHeaders = require('./routes/setCacheHeaders');
const standardiseUrl = require('./routes/standardiseUrl');
const handleError = require('./routes/handleError');

const IS_DEVELOPMENT = env !== 'production';
const IS_ACME_ENABLED = process.env.IS_ACME_ENABLED === 'true';

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

/* Register here so that ACME challenges
 * are notredirected to HTTP. */
if (IS_ACME_ENABLED) {
	app.get('/.well-known/acme-challenge/:token', getAcmeKeyAuth);
}

if (!IS_DEVELOPMENT) {
	app.use(standardiseUrl);
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
