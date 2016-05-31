'use strict';

module.exports = function (req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'http') {
		res.redirect(301, `https://${req.hostname}${req.url}`);
		return;
	}
	
	next();	
};