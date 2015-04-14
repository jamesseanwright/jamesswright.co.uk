'use strict';

var glob = require('glob');
var fs = require('fs');
var Showdown = require('showdown');
var converter = new Showdown.converter();

module.exports = function (req, res, next) {
	var posts = [];

	glob('blogs/**/*.md', function (err, files) {
		if (err) {
			next(err);
			return;
		}

		files.forEach(function (file, i) {
			fs.readFile(file, function (err, content) {
				console.log(content);

				if (err) {
					next(err);
					return;
				}

				posts.push(converter.makeHtml(content));
				
				if (i === files.length - 1) {
					res.send(posts);
				}
			});
		});
	});
};