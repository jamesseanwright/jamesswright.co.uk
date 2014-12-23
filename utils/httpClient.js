'use strict';

var Promise = require('promise'),
	invalidStatusCodes = ['4', '5'],
	http = require('http');

module.exports = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			var resData = '',
				req;

			req = http.get(url, function (res) {
				res.on('data', function (data) {
					resData += data;
				});

				res.on('end', function () {
					req.end();
					invalidStatusCodes.includes(res.statusCode.toString()[0])
						? reject(res.statusCode)
						: resolve(resData);
					
					
				});
			});

			req.on('error', function (err) {
				req.end();
				reject(err.message);
			});
		});
	}
};