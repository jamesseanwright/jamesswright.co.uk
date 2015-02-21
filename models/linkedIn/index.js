'use strict';

var jonathan = require('jonathan');
var httpClient = require('../../data/httpClient');
var Profile = require('./profile');
var accessTokenKey = 'linkedinToken';
var AUTH_ROOT = 'https://www.linkedin.com/uas/oauth2/';

function getAccessToken() {
	var promises = [];
	var accessToken = jonathan.get(accessTokenKey);

	if (accessToken) {
		return Promise.resolve(accessToken);
	}

	if (!process.env.LINKEDIN_OAUTH_CODE) {
		var queryString = '?response_type=code' 
			+ '&client_id='+ process.env.LINKEDIN_CLIENT_ID
			+ '&redirect_uri=http://localhost:3000/linkedin-callback'
			+ '&state='+ process.env.LINKEDIN_STATE
			+ '&scope=r_fullprofile';

		// promises.push(httpClient.get(AUTH_ROOT + 'authorization' + queryString));
		httpClient.get(AUTH_ROOT + 'authorization' + queryString)
			.then(function (response) {
				console.log(response);
			});

		return;
	}

	console.log('now doing post');
	promises.push(httpClient.post(AUTH_ROOT + 'accessToken', {
		grant_type: process.env.LINKEDIN_STATE,
		code: process.env.LINKEDIN_OAUTH_CODE,
		redirect_uri: 'http://localhost:3000/linkedin-callback',
		client_id: process.env.LINKEDIN_CLIENT_ID,
		client_secret: process.env.LINKEDIN_CLIENT_SECRET,
		response_type: 'json'
	}));

	return Promise.all(promises).then(function (response) {
		console.log('seysery');
		console.log(response);
		jonathan.add(accessTokenKey, response.access_token, (30).days);
		return response.access_token;
	});
}

function getData(field) {
	return getAccessToken()
		.then(function (token) {
			console.log(token);

			return httpClient.get('https://api.linkedin.com/v1/people/~/' + field + '?format=json', {
				'Authorization': 'Bearer ' + token
			});
		});
}

module.exports = {
	getProfile: function () {
		var promises = [getData('positions'), getData('educations'), getData('recommendations-received')];

		return Promise.all(promises).then(function (responses) {
			console.log(responses);

			return new Profile(responses[0], responses[1], responses[2]);
		}).catch(function (err) {
			throw err;
		});
	}
};