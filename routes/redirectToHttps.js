'use strict';

module.exports = function redirectToHttps(req, res) {
	res.writeHead(301, {
		'Location': `https://${req.headers.host}${req.url}`,
		'Content-Type': 'text/plain'
	});
	
	res.end('Redirecting to SSL endpoint...');
};