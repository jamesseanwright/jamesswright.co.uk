'use strict';

var fs = require('fs'),
	views = fs.readdirSync(__dirname + '/../views').filter(function (view) { return view.indexOf('.html') > -1; });

module.exports = function (req, res, next) {
	var view = (req.params.viewName || 'index') + '.html';

	views.includes(view)
		? res.render(view)
		: next(new Error(404));
}