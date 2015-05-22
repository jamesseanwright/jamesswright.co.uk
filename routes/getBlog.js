'use strict';

var index = require('../blogs');

module.exports = function (req, res, next) {
	res.render('blog/posts.html', {
		posts: index
	});
};