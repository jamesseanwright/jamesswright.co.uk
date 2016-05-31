'use strict';

const express = require('express');
const swig = require('swig');
const notifyValimate = require('valimate-notifier');

const app = express();
const env = process.env.NODE_ENV || 'production';
const getBlog = require('./routes/getBlog');
const getBlogPost = require('./routes/getBlogPost');
const getProjects = require('./routes/getProjects');
const getView = require('./routes/getView');
const setCacheHeaders = require('./routes/setCacheHeaders');
const handleError = require('./routes/handleError');

const IS_DEVELOPMENT = env === 'development';

var server;

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

app.use(setCacheHeaders);

app.get('/projects', getProjects);
app.get('/blog', getBlog);
app.get('/blog/:slug', getBlogPost);
app.get('/:viewName?', getView);

app.get('/.well-known/acme-challenge/aiyvO0tnY25eFTsP_j9AHe4HscWGBq4oP6fX5WjvWX0.XAHUidcd2vu5uo7jdxzAt2C0vXDscTL', (req, res) => {
   res.end('aiyvO0tnY25eFTsP_j9AHe4HscWGBq4oP6fX5WjvWX0.XAHUidcd2vu5uo7jdxzAt2C0vXDscTL'); 
});

app.use(handleError);

server = app.listen(process.env.PORT || 3000, function onBound() {
    console.log('Website running on port ' + server.address().port
        + '\nEnvironment: ' + env);

    notifyValimate(true);
});

process.on('SIGTERM', function die() {
    console.log('Ending server process...');

    server.close(function () {
        process.exit(0);
    });
});
