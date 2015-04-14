'use strict';

var glob = require('glob');
var fs = require('fs');
var Showdown = require('showdown');
var converter = new Showdown.converter();

function convert(file, posts) {
	fs.readFile(file, function (err, content) {
		if (err) {
			next(err);
			return;
		}

		posts.push(converter.makeHtml(content.toString()));
	});
}

module.exports = function (req, res, next) {
	var posts = [];

	glob('blogs/**/*.md', function (err, files) {
		if (err) {
			next(err);
			return;
		}

		files.forEach(function (file, i) {
			convert(file, posts);

			if (i === files.length - 1) {
				res.render('blog.html', {
					posts: posts
				});
			}
		});
	});
};