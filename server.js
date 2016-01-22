'use strict';

var express = require('express');
var swig = require('swig');
var notifyValimate = require('valimate-notifier');

var app = express();
var server;
var env = process.env.NODE_ENV || 'production';
var getBlog = require('./routes/getBlog');
var getBlogPost = require('./routes/getBlogPost');
var getProjects = require('./routes/getProjects');
var getView = require('./routes/getView');
var setCacheHeaders = require('./routes/setCacheHeaders');
var handleError = require('./routes/handleError');
var isDevelopment = env === 'development';

require('./init')();

app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({
    cache: isDevelopment
        ? false
        : 'memory',

    locals: {
        currentYear: function () {
            return new Date().getFullYear();
        }
    }
});

app.use(setCacheHeaders);

app.get('/projects', getProjects);
app.get('/blog', getBlog);
app.get('/blog/:slug', getBlogPost);
app.get('/:viewName?', getView);

app.use(handleError);

server = app.listen(process.env.PORT || 3000, function () {
    console.log('Website running on port ' + server.address().port
        + '\nEnvironment: ' + env);

    notifyValimate(true);
});

process.on('SIGTERM', function () {
    console.log('Ending server process...');
    server.close(function () {
        process.exit(0);
    });
});
