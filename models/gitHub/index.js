'use strict';

var jonathan = require('jonathan');
var httpClient = require('../../data/httpClient');
var Repo = require('./repo');
var REPOS_KEY = 'repos';

function fetch() {
	var repos = jonathan.get(REPOS_KEY);

	if (repos) {
		return Promise.resolve(repos);
	} else {
		return httpClient.get('https://api.github.com/users/jamesseanwright/repos')
			.then(function (data) {
				data = JSON.parse(data);

				data = data.sort(function (a, b) {
					return Date.parse(b.created_at) - Date.parse(a.created_at);
				}).map(function (repo) {
					return new Repo(repo);
				});

				jonathan.add(REPOS_KEY, data, (3).days);
				return data;
			}).catch(function (err) {
				throw err;
			});
	}
}

module.exports = {
	getRepos: function getRepos() {
		return fetch()
			.then(function (data) {
				return data.filter(function (repo) {
					return !repo.isFork;
				});
			});
	},

	getForks: function getForks() {
		return fetch()
			.then(function (data) {
				return data.filter(function (repo) {
					return repo.isFork;
				});
			});
	}
};