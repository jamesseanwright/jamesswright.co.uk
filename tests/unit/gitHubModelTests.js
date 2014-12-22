var should = require('should'),
	sinon = require('sinon'),
	mockCallback,
	mockData = [],
	gitHubModel;

describe('the GitHub model', function () {
	beforeEach(function () {
		gitHubModel = require('../../models/gitHubModel');
	});

	it('should return a list of GitHub repos', function () {
		mockCallback = sinon.mock({ callback: function (results) {} })
								.expects('callback').once();

		gitHubModel.getRepos().then(mockCallback.callback);

		mockCallback.verify();
	});
});