'use strict';

const blogsModel = require('../models/blog');

module.exports = function getBlog(req, res, next) {
	res.render('blog/posts.html', {
		posts: blogsModel.getAll()
	});
};
