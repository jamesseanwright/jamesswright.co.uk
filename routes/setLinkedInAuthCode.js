'use strict';

module.exports = function (req, res, next) {
	console.log('here!');

	if (req.query.state !== process.env.LINKEDIN_STATE) {
		next(new Error(401));
		return;
	}

	process.env.LINKEDIN_OAUTH_CODE = req.query.code;
	res.redirect(301, '/experience');
};