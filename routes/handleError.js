'use strict';

var fs = require('fs');
var errorViews = fs.readdirSync(__dirname + '/../views/error')
	.filter(function (view) { 
		return view.indexOf('.html') > -1;
	});

module.exports = function (err, req, res, next) {
	var targetView = err.message + '.html';
	var hasTarget = errorViews.includes(targetView);

	if (process.env.NODE_ENV === 'development') {
		console.error(err);
	}

	res.status(err.message || 500).render('error/' + (hasTarget ? targetView : 'all.html'));
}