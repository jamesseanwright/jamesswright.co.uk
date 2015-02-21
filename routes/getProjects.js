'use strict';

var gitHubModel = require('../models/gitHub');

module.exports = function (req, res, next) {
	gitHubModel.getRepos()
		.then(function (repos) {
			res.render('projects.html', { repos: repos });
		}).catch(next);
	};