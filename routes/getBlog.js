'use strict';

var glob = require('glob');
var fs = require('fs');
var jonathan = require('jonathan');
var POSTS_KEY = 'posts';
var MAX_DESCRIPTION_LENGTH = 200;

function read(file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, function (err, content) {
			if (err) {
				reject(err);
			}

			resolve(content.toString());
		});
	});
}

function createPostModels(contents) {
	var models = contents.map(function (content) {
		// TODO: create postModel
		var description = content.match(/<\/time>\n[\n]*(.*)/)[1];

		if (description.length > MAX_DESCRIPTION_LENGTH) {
			description = description.substr(0, MAX_DESCRIPTION_LENGTH) + '...';
		}

		return {
			title: content.match(/## \[(.*)\]/)[1],
			slug: content.match(/\(\/blog\/(.*)\)/)[1],
			date: content.match(/>(.*)<\/time>/)[1],
			description: description
		};
	});

	return Promise.resolve(models);
}

function render(res, posts) {
	res.render('blog/posts.html', {
		posts: posts
	});
}

module.exports = function (req, res, next) {
	var promises;
	var cachedPosts = jonathan.get(POSTS_KEY);

	if (cachedPosts) {
		render(res, cachedPosts);
		return;
	}

	glob('blogs/**/*.md', function (err, files) {
		if (err) {
			next(err);
			return;
		}

		files.reverse();

		// TODO: move into post model
		promises = files.map(function (file) {
			return read(file);
		});

		Promise.all(promises)
			.then(createPostModels)
			.then(function (posts) {
				jonathan.add(POSTS_KEY, posts, (2).days);
				render(res, posts);
			});
	});
};