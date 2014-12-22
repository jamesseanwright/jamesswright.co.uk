var should = require('should'),
	sinon = require('sinon'),
	http = require('http'),
	mockCallback,
	mockData = [],
	mockHttp,
	httpClient;

describe('the HTTP client', function () {
	beforeEach(function () {
		httpClient = require('../../utils/httpClient');
	});

	it('should return data for a requested endpoint via GET', function () {
		mockCallback = sinon.mock({ callback: function (data) {} })
								.expects('callback').once();

		mockHttp = sinon.mock(http).expects('get').once().withArgs('http://lol', mockCallback.callback).callsArg(1);

		httpClient.get('http://lol')
			.then(function () {
				console.log('hello');
			});

		mockCallback.verify();
		mockHttp.verify();
	});
});