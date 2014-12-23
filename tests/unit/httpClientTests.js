var should = require('should'),
	sinon = require('sinon'),
	nock = require('nock'),
	handler = { callback: function (data) { } },
	mockCallback,
	httpClient;

describe('the HTTP client', function () {
	beforeEach(function () {
		httpClient = require('../../utils/httpClient');
	});

	describe('HTTP GET', function () {
		it('should return data for a requested endpoint via GET', function (done) {
			nock('http://lol')
				.get('/')
				.reply(200, 'response body!');

			mockCallback = sinon.mock(handler)
								.expects('callback')
								.once()
								.withArgs('response body!');

			httpClient.get('http://lol')
				.then(handler.callback)
				.then(function () {
					//Why can't I pass verify as a reference to then?
					mockCallback.verify();
				})
				.then(done)
				.catch(done);
		});
	});
});