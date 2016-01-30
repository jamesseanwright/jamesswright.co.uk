'use strict';

const request = require('request');

const INVALID_STATUS_CODES = ['4', '5'];
const USER_AGENT = 'jamesswright.co.uk';

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

		payload.headers['User-Agent'] = USER_AGENT;

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
	get(url, headers) {
		return makeRequest(url);	
	},

	post(url, data) {
		return makeRequest(url, 'post', data);	
	}
};