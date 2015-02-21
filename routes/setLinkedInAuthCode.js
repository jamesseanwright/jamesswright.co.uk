'use strict';

module.exports = function (req, res, next) {
	process.env.LINKEDIN_OAUTH_CODE = req.params.code;
	res.redirect(301, '/');
};