'use strict';

const setCacheHeaders = require('../../../../routes/setCacheHeaders');

describe('the setCacheHeaders middleware', function () {
	const response = {
		set: function () { }
	};

	const middleware = {
		next: function () { }
	}

	const mockResponse = sinon.mock(response);
	const mockMiddleware = sinon.mock(middleware);

	it('should set the Cache-Control header and invoke next', function () {
		mockResponse.expects('set')
			.once()
			.withArgs('Cache-Control', 'max-age=86400');

		mockMiddleware.expects('next')
			.once();

		setCacheHeaders(null, response, middleware.next);
		mockResponse.verify();
		mockMiddleware.verify();
	});
});