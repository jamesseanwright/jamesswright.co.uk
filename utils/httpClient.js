'use strict';

var Promise = require('promise'),
	invalidStatusCodes = ['4', '5'],
	request = require('request');

module.exports = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			var payload = {
				url: url,
				headers: {
					'User-Agent': 'jamesswright.co.uk'
				}
			}

			request(payload, function (error, response, body) {
				if (invalidStatusCodes.includes(response.statusCode.toString()[0])) {
					reject(new Error(response.statusCode));
				} else {
					resolve(body);
				}
			});
		});
	}
};