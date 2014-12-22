'use strict';

var Promise = require('promise'),
	http = require('http');

module.exports = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			http.get(url, resolve)
				.on('error', reject);
		});
	}
};