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

		return this._getContent(slug)
			.then(this._convert)
			.then(markdown => this._buildPost(slug, markdown))
			.then(post => this._cachePost(key, post));
	},
	
	_getContent(slug) {
		return this._findFileBySlug(slug)
				   .then(this._readFile);
	},
	
	_findFileBySlug(slug) {
		return new Promise((resolve, reject) => {
			glob(`blogs/**/${slug}.md`, (error, files) => {
				if (error) {
					reject(error);
				} else if (!files.length) {
					reject(new Error(404));
				} else {
					resolve(files[0]);
				}
			});
		});
	},
	
	_readFile(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(file, function (error, content) {
				if (error) {
					reject(err);
				} else {
					resolve(content);
				}
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
