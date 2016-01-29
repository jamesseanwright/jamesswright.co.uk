'use strict';

const INVALID_STATUS_CODES = ['4', '5'];
const request = require('request');

// TODO: make this testable like the blog model
function makeRequest(url, method, data, headers) {
	return new Promise((resolve, reject) => {
		const payload = {
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

		request[method || 'get'](payload, (error, response, body) => {
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