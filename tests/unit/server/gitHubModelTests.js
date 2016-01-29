'use strict';

const jonathan = require('jonathan');
const httpClient = require('../../../data/httpClient');
const Repo = require('../../../models/gitHub/repo');

describe('the GitHub model', function () {
	describe('the data provider', function () {
		var gitHubModel;
		const mockJonathan = sinon.mock(jonathan);

		beforeEach(function () {
			gitHubModel = require('../../../models/gitHub');
		});

		afterEach(function () {
			if (jonathan.add.restore) {
				jonathan.add.restore();
			}

			if (jonathan.get.restore) {
				jonathan.get.restore();
			}

			if (httpClient.get.restore) {
				httpClient.get.restore();
			}
		});

		it('should retrieve repos from Jonathan if available', function () {
			const expectedData = [{
				name: 'repo',
				isFork: false
			}];

			sinon.stub(jonathan, 'get')
				.withArgs('repos')
				.returns(expectedData);

			return gitHubModel.getRepos()
				.then(function (data) {
					data[0].should.equal(expectedData[0]);
				});
		});

		it('should retrieve repos via HTTP and store them in Jonathan if needed', function () {
			const expectedData = [{
				name: 'repo',
				isFork: false
			}];

			const rawData = [{
				name: 'repo',
				fork: false,
				created_at: 1
			}];

			mockJonathan.expects('add')
				.once()
				.withArgs('repos', sinon.match.array, (3).days)
				.returns(expectedData);

			sinon.stub(httpClient, 'get')
				.withArgs('https://api.github.com/users/jamesseanwright/repos')
				.returns(Promise.resolve(JSON.stringify(rawData)));

			return gitHubModel.getRepos()
				.then(function (data) {
					data[0].name.should.equal(expectedData[0].name);
					mockJonathan.verify();
				});
		});

		it('should be able to retrieve forks', function () {
			const expectedData = [{
				name: 'repo',
				isFork: true
			}];

			sinon.stub(jonathan, 'get')
				.withArgs('repos')
				.returns(expectedData);

			return gitHubModel.getForks()
				.then(function (data) {
					data[0].should.equal(expectedData[0]);
				});
		});
	});

	describe('the Repo model', function () {
		it('should normalise repository data from GitHub', function () {
			const rawData = {
				name: 'my repo',
				html_url: 'http://stuff',
				language: 'C#',
				description: 'Some stuff',
				fork: false
			};

			var repo = new Repo(rawData);

			//normalisation isn't doing too much at the moment...
			repo.name.should.equal(rawData.name);
			repo.url.should.equal(rawData.html_url);
			repo.language.should.equal(rawData.language);
			repo.description.should.equal(rawData.description);
			repo.isFork.should.equal(rawData.fork);
		});
	});
});