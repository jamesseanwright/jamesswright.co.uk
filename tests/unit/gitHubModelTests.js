var should = require('should'),
	sinon = require('sinon'),
	jonathan = require('jonathan'),
	httpClient = require('../../utils/httpClient'),
	mockCallback,
	mockJonathanGet,
	mockJonathanStore,
	mockData = [],
	gitHubModel;

describe('the GitHub model', function () {
	beforeEach(function () {
		gitHubModel = require('../../models/gitHubModel');
	});

	it('should return a list of GitHub repos from Jonathan if possible', function (done) {
		mockJonathanGet = sinon.mock(jonathan).expects('get').withArgs('repos').once().returns([ 'repo1', 'repo2' ]);
		gitHubModel.getRepos().then(function (data) {
			data.should.be.eql([ 'repo1', 'repo2' ]);
		}).then(function () {
			mockJonathanGet.verify();
		}).then(done).catch(done);
	});
});