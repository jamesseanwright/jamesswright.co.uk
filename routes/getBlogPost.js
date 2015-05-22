'use strict';

var glob = require('glob');
var fs = require('fs');
var jonathan = require('jonathan');
var Showdown = require('showdown');
var converter = new Showdown.converter();
var POST_KEY = 'post';

// TODO: move into single entry route
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

function render(res, post) {
	res.render('blog/post.html', {
		post: post
	});
}

module.exports = function (req, res, next) {
	var slug = req.params.slug;
	var key = POST_KEY + '-' + slug;
	var post = jonathan.get(key);

	if (post) {
		render(res, post);
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
				render(res, markdown);
			}).catch(next);
	});
};