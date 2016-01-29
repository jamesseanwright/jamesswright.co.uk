'use strict';

const jonathan = require('jonathan');
const httpClient = require('../../data/httpClient');
const Repo = require('./repo');
const REPOS_KEY = 'repos';

// TODO: this method's a bit big!
function fetch() {
	const repos = jonathan.get(REPOS_KEY);
	
	if (repos) {
		return Promise.resolve(repos);
	} else {
		return httpClient.get('https://api.github.com/users/jamesseanwright/repos')
			.then(data => {
				data = JSON.parse(data);

				data = data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
						   .map(repo => new Repo(repo));

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
				return data.filter(repo => !repo.isFork);
			});
	},

	getForks: function getForks() {
		return fetch()
			.then(function (data) {
				return data.filter(repo => repo.isFork);
			});
	}
};