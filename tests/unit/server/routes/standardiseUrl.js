'use strict';

const standardiseUrl = require('../../../../routes/standardiseUrl');

describe('the URL standardisation middleware', function () {
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
			   
		standardiseUrl(req, res, () => {});
		
		mockRes.verify();
	});
	
	it('should redirect WWW requests', function () {
		const req = {
			headers: {
				'x-forwarded-proto': 'https'
			},
			
			hostname: 'www.jamesswright.co.uk',
			url: '/?foo=bar'
		}
		
		mockRes.expects('redirect')
			   .once()
			   .withArgs(301, 'https://jamesswright.co.uk/?foo=bar');
			   
		standardiseUrl(req, res, () => {});
		
		mockRes.verify();
	});
	
	it('should not redirect non-WWW requests', function () {
		const req = {
			headers: {
				'x-forwarded-proto': 'https'
			},
			
			hostname: 'jamesswright.co.uk',
			url: '/?foo=bar'
		}
		
		mockRes.expects('redirect')
			   .never();
			   
		standardiseUrl(req, res, () => {});
		
		mockRes.verify();
	});
});