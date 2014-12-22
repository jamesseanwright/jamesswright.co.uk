'use strict';

module.exports = function (err, req, res, next) {
	console.log(err.message);
	res.status(err.message).render('error/' + err.message + '.html');
}