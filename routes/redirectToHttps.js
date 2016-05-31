'use strict';

module.exports = function (req, res, next) {
	if (req.protocol === 'http') {
		res.redirect(301, `https://${req.hostname}${req.url}`);
		return;
	}
	
	next();	
};