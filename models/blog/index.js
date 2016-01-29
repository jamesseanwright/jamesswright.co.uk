'use strict';

const glob = require('glob');
const fs = require('fs');
const jonathan = require('jonathan');
const Showdown = require('showdown');
const converter = new Showdown.converter();
const posts = require('../../blogs');
const POST_KEY = 'post';

module.exports = {
	getAll() {
		return posts;
	},

	get(slug) {
		const key = POST_KEY + '-' + slug;
		const post = jonathan.get(key);

		if (post) {
			return Promise.resolve(post);
		}

		return this._open(slug)
			.then(this._convert)
			.then(post => this._buildPost(slug, post))
			.then(post => this._cachePost(key, post));
	},
	
	_open(slug) {
		return new Promise((resolve, reject) => {
			glob('blogs/**/' + slug + '.md', function (err, files) {
				if (!files.length) {
					reject(new Error(404));
					return;
				}

				fs.readFile(files[0], function (err, content) {
					if (err) {
						reject(err);
						return;
					}

					resolve(content);
				});
			});
		});
	},
	
	_convert(markdown) {
		return Promise.resolve(converter.makeHtml(markdown.toString()));
	},
	
	_buildPost(slug, html) {
		const post = {
			title: this._getTitle(slug),
			html: html
		};

		return post;
	},
	
	_getTitle(slug) {
		return this.getAll().find(post => post.slug === slug).title;
	},
	
	_cachePost(key, post) {
		jonathan.add(key, post);
		return post;
	}
};
