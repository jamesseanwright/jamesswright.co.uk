var nock = require('nock');
var handler = { callback: function (data) { } };
var mockCallback;
var httpClient;
var fakeHttp;

require('../../utils/polyfills')();

describe('the HTTP client', function () {
	beforeEach(function () {
		httpClient = require('../../utils/httpClient');
	});

	describe('HTTP GET', function () {
		it('should return data for a requested endpoint via GET', function () {
			fakeHttp = nock('http://stuff')
				.get('/')
				.reply(200, 'response body!');

			mockCallback = sinon.mock(handler)
								.expects('callback')
								.once()
								.withArgs('response body!');

			return httpClient.get('http://stuff')
				.then(handler.callback)
				.then(function () {
					mockCallback.verify();
				})
				.then(function () {
					fakeHttp.isDone();
					handler.callback.restore();
				});
		});

		it('should reject the promise when the response status is 404', function () {
			fakeHttp = nock('http://stuff')
				.get('/')
				.reply(404, 'you messed up!');

			return httpClient.get('http://stuff')
				.catch(function (err) {
					err.message.should.equal('404');
					fakeHttp.isDone();
				});
		});

		it('should reject the promise when the response status is 500', function () {
			fakeHttp = nock('http://stuff')
				.get('/')
				.reply(500, 'we messed up!');

			return httpClient.get('http://stuff')
				.catch(function (err) {
					err.message.should.equal('500');
					fakeHttp.isDone();
				});
		});
	});
});