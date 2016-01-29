'use strict';

const fs = require('fs');
const views = fs.readdirSync(__dirname + '/../views')
	.filter(function (view) { 
		return view.indexOf('.html') > -1; 
	});

module.exports = function getView(req, res, next) {
	const view = (req.params.viewName || 'index') + '.html';

	views.includes(view)
		? res.render(view)
		: next(new Error(404));
};