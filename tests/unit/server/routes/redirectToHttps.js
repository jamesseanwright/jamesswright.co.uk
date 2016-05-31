'use strict';

const redirectToHttps = require('../../../../routes/redirectToHttps');

describe('the HTTPS redirect middleware', function () {
	const res = {
		redirect() {}
	};
	
	let mockRes;
	
	beforeEach(function () {
		mockRes = sinon.mock(res);
	});
	
	afterEach(function () {
		mockRes.restore();
	});
	
	it('should redirect HTTP requests', function () {
		const req = {
			headers: {
				'x-forwarded-proto': 'http'
			},
			
			hostname: 'jamesswright.co.uk',
			url: '/?foo=bar'
		}
		
		mockRes.expects('redirect')
			   .once()
			   .withArgs(301, 'https://jamesswright.co.uk/?foo=bar');
			   
		redirectToHttps(req, res, () => {});
		
		mockRes.verify();
	});
	
	it('should not redirect HTTPS requests', function () {
		const req = {
			headers: {
				'x-forwarded-proto': 'https'
			},
			
			hostname: 'jamesswright.co.uk',
			url: '/?foo=bar'
		}
		
		mockRes.expects('redirect')
			   .never();
			   
		redirectToHttps(req, res, () => {});
		
		mockRes.verify();
	});
});