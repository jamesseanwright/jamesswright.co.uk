'use strict';

var Promise = require('promise'),
	jonathan = require('jonathan'),
	httpClient = require('../utils/httpClient');

module.exports = {
	getRepos: function () {
		return new Promise(function (resolve, reject) {
			var repos = jonathan.get('repos');

			if (repos) {
				resolve(repos);
			}

			//httpClient.get('https://api.github.com/users/jamesseanwright/repos')
		});
	}
};