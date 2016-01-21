'use strict';

var blogsModel = require('../models/blog');

module.exports = function (req, res, next) {
	blogsModel.get(req.params.slug)
		.then(function (post) {
			res.render('blog/post.html', {
				title: post.title,
				html: post.html
			});
		}).catch(next);
};
