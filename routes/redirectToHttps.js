'use strict';

module.exports = function (req, res, next) {
	console.log('*****', req.protocol, req.hostname, req.headers);
	
	if (req.headers['x-forwarded-proto'] === 'http') {
		res.redirect(301, `https://${req.hostname}${req.url}`);
		return;
	}
	
	next();	
};