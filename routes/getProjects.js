'use strict';

var gitHubModel = require('../models/gitHubModel');

module.exports = function (req, res, next) {
	gitHubModel.getRepos()
		.then(function (repos) {
			res.render('projects.html', { repos: repos });
		}).catch(next);
	};