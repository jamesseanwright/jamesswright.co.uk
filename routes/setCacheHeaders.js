'use strict';

const MAX_AGE = 60 * 60 * 24;

module.exports = function setCacheHeaders(req, res, next) {
	res.set('Cache-Control', 'max-age=' + MAX_AGE);
	next();
};