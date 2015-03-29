'use strict';

var gitHubModel = require('../models/gitHub');

module.exports = function (req, res, next) {
	var requests = [
		gitHubModel.getRepos(),
		gitHubModel.getForks()
	];

	return Promise.all(requests)
		.then(function (responses) {
			res.render('projects.html', {
				repos: responses[0],
				forks: responses[1]
			});
		}).catch(next);
	};