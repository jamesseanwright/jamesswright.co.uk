'use strict';

const fs = require('fs');
const errorViews = fs.readdirSync(__dirname + '/../views/error')
	.filter(function (view) { 
		return view.indexOf('.html') > -1;
	});

module.exports = function handleError(err, req, res, next) {
	const targetView = err.message + '.html';
	const hasTarget = errorViews.includes(targetView);

	console.error(err.message, 'for', req.path, '\n', err.stack);
	res.status(err.message || 500).render('error/' + (hasTarget ? targetView : 'all.html'));
}