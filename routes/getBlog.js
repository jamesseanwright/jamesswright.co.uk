'use strict';

var blogsModel = require('../models/blog');

module.exports = function (req, res, next) {
	res.render('blog/posts.html', {
		posts: blogsModel.getAll()
	});
};