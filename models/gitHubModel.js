'use strict';

var jonathan = require('jonathan');
var httpClient = require('../data/httpClient');
var reposKey = 'repos';

module.exports = {
	getRepos: function () {
		var repos = jonathan.get(reposKey);

		if (repos) {
			return Promise.resolve(repos);
		} else {
			return httpClient.get('https://api.github.com/users/jamesseanwright/repos')
				.then(function (data) {
					data = JSON.parse(data);
					data = data.filter(function (repo) {
						return !repo.fork;
					});

					jonathan.add(reposKey, data, (3).days);
					return data;
				}).catch(function (err) {
					throw err;
				});
		}
	}
};