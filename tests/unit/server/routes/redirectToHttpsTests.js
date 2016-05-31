'use strict';

const redirectToHttps = require('../../../../routes/redirectToHttps');

describe('the HTTPS redirect middleware', function () {
	const res = {
		writeHead() {},
		end() {}
	};
	
	let mockRes;
	
	beforeEach(function () {
		mockRes = sinon.mock(res);
	});
	
	afterEach(function () {
		mockRes.restore();
	});
	
	it('should redirect a HTTP request to HTTPS', function () {
		const req = {
			headers: {
				host: 'jamesswright.co.uk'
			},
			
			url: '/path?foo=bar'
		};
		
		mockRes.expects('writeHead')
			   .once()
			   .withArgs(301, {
				   'Location': 'https://jamesswright.co.uk/path?foo=bar',
				   'Content-Type': 'text/plain'
			   });
			   
		redirectToHttps(req, res);
		mockRes.verify();
	});
});