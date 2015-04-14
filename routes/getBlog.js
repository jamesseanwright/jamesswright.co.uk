'use strict';

var glob = require('glob');
var fs = require('fs');
var Showdown = require('showdown');
var converter = new Showdown.converter();

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

module.exports = function (req, res, next) {
	var posts = [];

	glob('blogs/**/' + (req.params.slug || '*') + '.md', function (err, files) {
		if (!files.length) {
			next(new Error(404));
			return;
		}

		if (err) {
			next(err);
			return;
		}

		files.forEach(function (file, i) {
			convert(file).then(function (markdown) {
				posts.push(markdown);

				if (i === files.length - 1) {
					res.render('blog.html', {
						posts: posts
					});
				}
			}).catch(next);
		});
	});
};