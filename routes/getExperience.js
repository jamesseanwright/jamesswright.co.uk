'use strict';

var linkedInModel = require('../models/linkedIn');

module.exports = function (req, res, next) {
	linkedInModel.getProfile()
		.then(function (profile) {
			console.log(profile);

			res.render('about-me.html');
		}).catch(next);
	};