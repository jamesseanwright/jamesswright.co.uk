var jonathan = require('jonathan');
var httpClient = require('../../../utils/httpClient');
var mockHttpClient;
var mockJonathanGet;
var mockJonathanAdd;
var mockData = [ 'repo1', 'repo2' ];
var gitHubModel;

describe('the GitHub model', function () {
	beforeEach(function () {
		gitHubModel = require('../../../models/gitHubModel');
	});

	it('should return a parsed list of GitHub repos from Jonathan if possible', function () {
		mockJonathanGet = sinon.mock(jonathan).expects('get').withArgs('repos').once().returns(mockData);
		
		return gitHubModel.getRepos().then(function (data) {
			data.should.be.eql(mockData);
		}).then(function () {
			mockJonathanGet.verify();
		}).then(function () {
			//I thought verify() did this?!
			//Turns out it doesn't, contrary to the docs.
			//Might report this to Sinon.js chaps
			jonathan.get.restore();
		});
	});

	it('should get the repos via the HTTP client and store them in Jonathan when needed', function () {
		mockJonathanGet = sinon.mock(jonathan).expects('get').withArgs('repos').once().returns(undefined);
		mockJonathanAdd = sinon.mock(jonathan).expects('add').withArgs('repos', mockData, (3).days).once();
		mockHttpClient = sinon.mock(httpClient).expects('get').withArgs('https://api.github.com/users/jamesseanwright/repos').once().promisify(JSON.stringify(mockData));

		return gitHubModel.getRepos().then(function (data) {
			data.should.be.eql(mockData);
		}).then(function () {
			mockJonathanGet.verify();
			mockJonathanAdd.verify();
			mockHttpClient.verify();
		}).then(function () {
			jonathan.get.restore();
			jonathan.add.restore();
			httpClient.get.restore();
		});
	});

	it('should not return forked repos', function () {
		var forkedData = [{ name: 'repo', fork: true }, { name: 'repo2', fork: false }];
		var nonForkedData = [{ name: 'repo2', fork: false }];
		
		mockJonathanGet = sinon.mock(jonathan).expects('get').withArgs('repos').once().returns(undefined);
		mockJonathanAdd = sinon.mock(jonathan).expects('add').withArgs('repos', nonForkedData, (3).days).once();
		mockHttpClient = sinon.mock(httpClient).expects('get').withArgs('https://api.github.com/users/jamesseanwright/repos').once().promisify(JSON.stringify(forkedData));

		return gitHubModel.getRepos().then(function (data) {
			data.should.be.eql(nonForkedData);
		}).then(function () {
			mockJonathanGet.verify();
			mockJonathanAdd.verify();
			mockHttpClient.verify();
		}).then(function () {
			jonathan.get.restore();
			jonathan.add.restore();
			httpClient.get.restore();
		});
	});
});