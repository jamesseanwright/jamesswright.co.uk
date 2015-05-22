'use strict';

var glob = require('glob');
var fs = require('fs');
var jonathan = require('jonathan');
var Showdown = require('showdown');
var converter = new Showdown.converter();
var posts = require('../blogs');
var POST_KEY = 'post';

function convert(file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, function (err, content) {
			if (err) {
				reject(err);
			}

			resolve(converter.makeHtml(content.toString()));
		});
	});
}

function render(res, post, slug) {
	var title = posts.filter(function(post) {
		return post.slug === slug;
	})[0].title;

	res.render('blog/post.html', {
		title: title,
		post: post
	});
}

module.exports = function (req, res, next) {
	var slug = req.params.slug;
	var key = POST_KEY + '-' + slug;
	var post = jonathan.get(key);

	if (post) {
		render(res, slug, post);
		return;
	}

	glob('blogs/**/' + slug + '.md', function (err, files) {
		if (!files.length) {
			next(new Error(404));
			return;
		}

		convert(files[0])
			.then(function (markdown) {
				jonathan.add(key, markdown, (1).months);
				render(res, markdown, slug);
			}).catch(next);
	});
};