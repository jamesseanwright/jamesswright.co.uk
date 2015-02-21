'use strict';

var jonathan = require('jonathan');
var httpClient = require('../../data/httpClient');
var Repo = require('./repo');
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
					}).sort(function (a, b) {
						return Date.parse(b.created_at) - Date.parse(a.created_at);
					}).map(function (repo) {
						return new Repo(repo);
					});

					console.log(data[0]);

					jonathan.add(reposKey, data, (3).days);
					return data;
				}).catch(function (err) {
					throw err;
				});
		}
	}
};