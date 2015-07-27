var glob = require('glob');
var fs = require('fs');
var jonathan = require('jonathan');
var Showdown = require('showdown');
var converter = new Showdown.converter();
var posts = require('../../blogs');
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

function getTitle(slug) {
	var title = posts.filter(function(post) {
		return post.slug === slug;
	})[0].title;
}

module.exports = {
	getAll: function getAll() {
		return posts;
	},

	get: function get(slug) {
		var key = POST_KEY + '-' + slug;
		var post = jonathan.get(key);

		if (post) {
			return Promise.resolve(post);
		}

		return new Promise(function (resolve, reject) {
			glob('blogs/**/' + slug + '.md', function (err, files) {
				if (!files.length) {
					reject(new Error(404));
					return;
				}

				convert(files[0])
					.then(function (html) {
						var post = {
							title: getTitle(slug),
							html: html
						};

						jonathan.add(key, post);
						resolve(post);
					}).catch(reject);
			});
		});
	}
};