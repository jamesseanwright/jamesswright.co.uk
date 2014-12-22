'use strict';

module.exports = function (err, req, res, next) {
	res.status(err.message).render('error/' + err.message + '.html');
}