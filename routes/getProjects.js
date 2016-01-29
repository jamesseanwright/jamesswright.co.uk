'use strict';

const gitHubModel = require('../models/gitHub');

module.exports = function getProjects(req, res, next) {
	const requests = [
		gitHubModel.getRepos(),
		gitHubModel.getForks()
	];

	return Promise.all(requests)
		.then(responses => {
			res.render('projects.html', {
				repos: responses[0],
				forks: responses[1]
			});
		}).catch(next);
	};