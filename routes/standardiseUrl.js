'use strict';

module.exports = function (req, res, next) {
	const protocol = req.headers['x-forwarded-proto'];
	const hostname = req.hostname;
	const shouldRedirect = protocol === 'http' || hostname.includes('www');
	
	if (shouldRedirect) {
		res.redirect(301, `https://${req.hostname.replace('www.', '')}${req.url}`);
		return;
	}
	
	next();	
};