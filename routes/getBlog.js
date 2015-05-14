'use strict';

var glob = require('glob');
var fs = require('fs');
var jonathan = require('jonathan');
var Showdown = require('showdown');
var converter = new Showdown.converter();
var POSTS_PER_PAGE = 5;

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

function getCacheKey(slug) {
	var base = 'posts';
	var pageNumber = parseInt(slug);

	if (!slug) {
		return base;
	}

	if (pageNumber) {
		return base + '-page-' + pageNumber;
	}

	return base + '-' + slug;
}

function render(res, posts, page) {
	var isPaginated = posts.length === 1;

	res.render('blog.html', {
		posts: posts,
		page: isPaginated ? page : null,
		totalPages: isPaginated ? POSTS_PER_PAGE : null
	});
}

module.exports = function (req, res, next) {
	var slug = req.params.slug;
	var key = getCacheKey(slug);
	var pageNumber = parseInt(slug) || 0;
	var isAllPosts = key === 'posts';
	var posts = jonathan.get(key);
	var promises = [];

	if (posts) {
		render(res, posts);
		return;
	}

	glob('blogs/**/' + (req.params.slug || '*') + '.md', function (err, files) {
		if (!files.length) {
			next(new Error(404));
			return;
		}

		if (err) {
			next(err);
			return;
		}

		files.reverse(); // latest first

		if (isAllPosts) {
			files = files.slice(pageNumber, pageNumber + POSTS_PER_PAGE);
		}

		promises = files.map(function (file) {
			return convert(file);
		});

		Promise.all(promises).then(function (markdowns) {
			jonathan.add(key, markdowns, (60).minutes);
			render(res, markdowns);
		}).catch(next);
	});
};