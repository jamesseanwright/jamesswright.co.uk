'use strict';

const blogsModel = require('../models/blog');

module.exports = function getBlogPost(req, res, next) {
	blogsModel.get(req.params.slug)
		.then(post => {
			res.render('blog/post.html', {
				title: post.title,
				html: post.html
			});
		}).catch(next);
};
