'use strict';

var Promise = require('promise'),
	http = require('http');

module.exports = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			var resData = '';

			http.get(url, function (res) {
				res.on('data', function (data) {
					resData += data;
				});

				res.on('end', function () {
					resolve(resData);
				});
			}).on('error', reject);
		});
	}
};