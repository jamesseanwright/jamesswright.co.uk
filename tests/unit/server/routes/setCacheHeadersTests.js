describe('the setCacheHeaders middleware', function () {
	var setCacheHeaders = require('../../../../routes/setCacheHeaders');
	var response = {
		set: function () { }
	};

	var middleware = {
		next: function () { }
	}

	var mockResponse = sinon.mock(response);
	var mockMiddleware = sinon.mock(middleware);

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