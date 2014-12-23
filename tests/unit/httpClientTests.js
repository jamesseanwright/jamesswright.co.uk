var should = require('should'),
	sinon = require('sinon'),
	nock = require('nock'),
	handler = { callback: function (data) { } },
	mockCallback,
	httpClient,
	mockHttp;

require('../../utils/polyfills')();

describe('the HTTP client', function () {
	beforeEach(function () {
		httpClient = require('../../utils/httpClient');
	});

	afterEach(function () {
		handler.callback.restore();
	});

	describe('HTTP GET', function () {
		it('should return data for a requested endpoint via GET', function (done) {
			mockHttp = nock('http://stuff')
				.get('/')
				.reply(200, 'response body!');

			mockCallback = sinon.mock(handler)
								.expects('callback')
								.once()
								.withArgs('response body!');

			httpClient.get('http://stuff')
				.then(handler.callback)
				.then(function () {
					mockCallback.verify();
				})
				.then(function () {
					mockHttp.isDone();
				})
				.then(done)
				.catch(done);
		});

		it('should reject the promise when the response status is 404', function (done) {
			nock('http://stuff')
				.get('/')
				.reply(404, 'you messed up!');

			mockCallback = sinon.mock(handler)
								.expects('callback')
								.once()
								.withArgs(404);

			httpClient.get('http://stuff')
				.then(null, handler.callback)
				.then(function (err) {
					mockCallback.verify();
					
				})
				.then(done)
				.catch(done);
		});

		it('should reject the promise when the response status is 500', function (done) {
			nock('http://stuff')
				.get('/')
				.reply(500, 'we messed up!');

			mockCallback = sinon.mock(handler)
								.expects('callback')
								.once()
								.withArgs(500);

			httpClient.get('http://stuff')
				.then(null, handler.callback)
				.then(function (err) {
					mockCallback.verify();
					
				})
				.then(done)
				.catch(done);
		});
	});
});