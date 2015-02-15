var dataClient = require('../../../data/dataClient');
var httpClient = require('../../../data/httpClient');
var jonathan = require('jonathan');
var mockHttp;
var mockJonathanAdd;
var mockJonathanGet;

describe('the dataClient', function () {
	afterEach(function () {
		jonathan.invalidate();
	});

	it('should retrieve data via HTTP and store it in the cache when cacheOptions are set', function () {
		var expectedResponse = 'roflcopter';

		mockHttp = sinon.mock(httpClient).expects('get').once().returns(expectedResponse);
		mockJonathanAdd = sinon.mock(jonathan).expects('add').once().withArgs('key', expectedResponse, (3).days);
		sinon.stub(jonathan, 'get').returns(expectedResponse);

		return dataClient.get('http://lol', {
			key: 'key',
			duration: (3).days
		}).then(function (response) {
			response.should.be.eql(expectedResponse);
			mockHttp.verify();
			mockJonathanAdd.verify();

			httpClient.get.restore();
			jonathan.get.restore();
			jonathan.add.restore();
		});
	});
});