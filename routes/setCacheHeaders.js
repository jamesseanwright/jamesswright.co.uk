'use strict';

var MAX_AGE = 60 * 60 * 24;

module.exports = function (req, res, next) {
	res.set('Cache-Control', 'max-age=' + MAX_AGE);
	next();
};