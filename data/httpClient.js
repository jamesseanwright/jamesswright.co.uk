'use strict';

var INVALID_STATUS_CODES = ['4', '5'];
var request = require('request');

function makeRequest(url, method, data, headers) {
	return new Promise(function (resolve, reject) {
		var payload = {
			url: url,
			headers: {}
		};

		if (method === 'post' && data) {
			payload.form = data;
		}

		if (headers) {
			payload.headers = headers;
		}

		payload.headers['User-Agent'] = 'jamesswright.co.uk';

		request[method || 'get'](payload, function (error, response, body) {
			if (INVALID_STATUS_CODES.includes(response.statusCode.toString()[0])) {
				reject(new Error(response.statusCode));
			} else {
				resolve(body);
			}
		});
	});
}

module.exports = {
	get: function (url, headers) {
		return makeRequest(url);	
	},

	post: function (url, data) {
		return makeRequest(url, 'post', data);	
	}
};